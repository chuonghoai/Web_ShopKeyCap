import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Profile } from "../models/profile.model";
import type { ProfileRepo } from "./profile.repo";

export class ProfileApiRepo implements ProfileRepo {
    /**
     * GET /user/profile
     * @returns Profile
     */
    async getProfile(): Promise<ApiResponse<Profile>> {
        return apiClient.get<ApiResponse<Profile>>('/user/profile');
    }
}
