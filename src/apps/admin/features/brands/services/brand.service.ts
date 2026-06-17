import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { BrandRepo } from "../repos/brand.repo";
import { BrandApiRepo } from "../repos/brandApi.repo";
import { BrandMockRepo } from "../repos/brandMock.repo";

export class BrandService {
    private readonly repo: BrandRepo;

    constructor(brandRepo: BrandRepo) {
        this.repo = brandRepo;
    }

    async getBrands() {
        return this.repo.getBrands();
    }
}

export const brandService = new BrandService(USE_MOCK ? new BrandMockRepo() : new BrandApiRepo());
