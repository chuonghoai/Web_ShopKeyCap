import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { ProfileRepo } from "../repo/profile.repo";
import { ProfileApiRepo } from "../repo/profileApi.repo";
import { ProfileMockRepo } from "../repo/profileMock.repo";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Profile, UpdateProfileDto } from "../models/profile.model";

export class ProfileService {
    private readonly profileRepo: ProfileRepo;
    constructor(profileRepo: ProfileRepo) {
        this.profileRepo = profileRepo;
    }

    async getProfile(): Promise<ApiResponse<Profile>> {
        return this.profileRepo.getProfile();
    }

    async updateProfile(data: UpdateProfileDto): Promise<ApiResponse<Profile>> {
        return this.profileRepo.updateProfile(data);
    }
}

export const profileService = new ProfileService(USE_MOCK ? new ProfileMockRepo() : new ProfileApiRepo());
