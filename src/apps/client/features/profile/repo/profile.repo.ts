import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Profile, UpdateProfileDto } from "../models/profile.model";

export interface ProfileRepo {
    getProfile(): Promise<ApiResponse<Profile>>;
    updateProfile(data: UpdateProfileDto): Promise<ApiResponse<Profile>>;
}
