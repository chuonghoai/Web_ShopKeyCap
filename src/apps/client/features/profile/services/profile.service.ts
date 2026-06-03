import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { ProfileRepo } from "../repo/profile.repo";
import { ProfileApiRepo } from "../repo/profileApi.repo";
import { ProfileMockRepo } from "../repo/profileMock.repo";

export class ProfileService {
    private readonly profileRepo: ProfileRepo;
    constructor(profileRepo: ProfileRepo) {
        this.profileRepo = profileRepo;
    }

    async getDefaultAddressAndShippingTime() {
        return this.profileRepo.getDefaultAddressAndShippingTime();
    }
};

export const profileService = new ProfileService(USE_MOCK ? new ProfileMockRepo() : new ProfileApiRepo());
