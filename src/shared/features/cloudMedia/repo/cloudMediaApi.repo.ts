import { apiClient } from "../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { MediaEntity, SaveMediaRequest, SignatureResponse } from "../models/cloudMedia.model";
import type { CloudMediaRepo } from "./cloudMedia.repo";

export class CloudMediaApiRepo implements CloudMediaRepo {
    /**
     * Endpoint: GET /media/signature
     * Purpose: Cấp signature an toàn để frontend upload trực tiếp lên Cloudinary.
     * Request: null
     * Response: SignatureResponse
     */
    async getSignature(): Promise<ApiResponse<SignatureResponse>> {
        return apiClient.get<ApiResponse<SignatureResponse>>('/media/signature');
    }

    /**
     * Endpoint: POST /medias
     * Purpose: Sau khi frontend upload lên Cloudinary thành công, gọi API này để backend tạo record trong bảng medias.
     * Request: SaveMediaRequest[]
     * Response: MediaEntity[]
     */
    async saveMedias(medias: SaveMediaRequest[]): Promise<ApiResponse<MediaEntity[]>> {
        return apiClient.post<ApiResponse<MediaEntity[]>>('/medias', medias);
    }
}
