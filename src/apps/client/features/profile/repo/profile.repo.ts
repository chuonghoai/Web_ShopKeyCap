import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Profile } from "../models/profile.model";

export interface ProfileRepo {
    getProfile(): Promise<ApiResponse<Profile>>;
}
