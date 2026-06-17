import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { MediaEntity, SaveMediaRequest, SignatureResponse } from "../models/cloudMedia.model";
import type { CloudMediaRepo } from "./cloudMedia.repo";

export class CloudMediaMockRepo implements CloudMediaRepo {
    async getSignature(): Promise<ApiResponse<SignatureResponse>> {
        let signature: SignatureResponse = {
            signature: "mock_signature_123",
            timestamp: Math.floor(Date.now() / 1000),
            apiKey: "mock_api_key",
            cloudName: "mock_cloud_name",
            expiresIn: 3600
        }
        return {
            success: true,
            message: "Lấy signature thành công",
            data: signature,
        };
    }

    async saveMedias(medias: SaveMediaRequest[]): Promise<ApiResponse<MediaEntity[]>> {
        let responseMedias: MediaEntity[] = medias.map((m, index) => ({
            id: index,
            url: m.secure_url,
        }))

        return {
            success: true,
            message: "Lưu media thành công",
            data: responseMedias,
        }
    }
}
