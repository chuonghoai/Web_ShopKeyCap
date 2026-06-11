import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { MediaEntity, SaveMediaRequest, SignatureResponse } from "../models/cloudMedia.model";

export interface CloudMediaRepo {
    getSignature(): Promise<ApiResponse<SignatureResponse>>;
    saveMedias(medias: SaveMediaRequest[]): Promise<ApiResponse<MediaEntity[]>>;
}
