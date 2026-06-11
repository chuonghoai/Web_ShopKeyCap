import { USE_MOCK } from "../../../../core/config/useMock.config";
import type { CloudinaryUploadResponse, MediaEntity, SignatureResponse } from "../models/cloudMedia.model";
import type { CloudMediaRepo } from "../repo/cloudMedia.repo";
import { CloudMediaApiRepo } from "../repo/cloudMediaApi.repo";
import { CloudMediaMockRepo } from "../repo/cloudMediaMock.repo";

const BUFFER_TIME = 5 * 60 * 1000;

export class CloudMediaService {
    private readonly repo: CloudMediaRepo;
    private cachedSignature: SignatureResponse | null = null;
    private signatureExpireTime: number | null = null;

    constructor(repo: CloudMediaRepo) {
        this.repo = repo;
    }

    /**
     * Get valid signature from backend
     */
    private async getValidSignature(): Promise<SignatureResponse> {
        if (this.cachedSignature && this.signatureExpireTime && Date.now() < this.signatureExpireTime) {
            return this.cachedSignature;
        }

        const res = await this.repo.getSignature();
        if (!res.success || !res.data) {
            throw new Error(res.message || "Không thể lấy signature upload");
        }

        this.cachedSignature = res.data;
        const expiresIn = res.data.expiresIn || 3600;
        this.signatureExpireTime = Date.now() + expiresIn * 1000 - BUFFER_TIME;

        return this.cachedSignature;
    }

    /**
     * Upload file directly to cloudinary
     */
    private async uploadToCloudinary(file: File, signatureData: SignatureResponse): Promise<CloudinaryUploadResponse> {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        public_id: `mock_public_id_${Date.now()}`,
                        secure_url: URL.createObjectURL(file),
                        format: file.type.split('/')[1] || "unknown",
                        resource_type: file.type.startsWith('video') ? 'video' : 'image',
                        bytes: file.size,
                        tags: ["tmp"]
                    });
                }, 1000);
            });
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", signatureData.apiKey);
        formData.append("timestamp", signatureData.timestamp.toString());
        formData.append("signature", signatureData.signature);
        formData.append("tags", "tmp");

        const cloudName = signatureData.cloudName;
        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

        const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload to Cloudinary failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data as CloudinaryUploadResponse;
    }

    /**
     * Action: Upload multi file
     */
    async upload(files: File[]): Promise<MediaEntity[]> {
        if (!files || files.length === 0) return [];

        try {
            const signatureData = await this.getValidSignature();

            const uploadPromises = files.map(file => this.uploadToCloudinary(file, signatureData));
            const cloudinaryResponses = await Promise.all(uploadPromises);

            const saveRequests = cloudinaryResponses.map(res => ({
                public_id: res.public_id,
                secure_url: res.secure_url,
                resource_type: res.resource_type,
                format: res.format,
                bytes: res.bytes,
                width: res.width,
                height: res.height,
            }));

            const saveRes = await this.repo.saveMedias(saveRequests);
            if (!saveRes.success || !saveRes.data) {
                throw new Error(saveRes.message || "Không thể lưu thông tin media vào hệ thống");
            }

            return saveRes.data;
        } catch (error) {
            this.cachedSignature = null;
            this.signatureExpireTime = null;
            throw error;
        }
    }
}

export const cloudMediaService = new CloudMediaService(USE_MOCK ? new CloudMediaMockRepo() : new CloudMediaApiRepo());
