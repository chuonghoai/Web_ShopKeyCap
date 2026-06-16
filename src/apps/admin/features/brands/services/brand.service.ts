import { brandApiRepo } from "../repos/brandApi.repo";
import { brandMockRepo } from "../repos/brandMock.repo";
import type { Brand } from "../models/brand.model";
import { USE_MOCK } from "../../../../../core/config/useMock.config";

export const brandService = {
    getBrands: async (): Promise<Brand[]> => {
        if (USE_MOCK) {
            return brandMockRepo.getBrands();
        }
        return brandApiRepo.getBrands();
    }
};
