import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Brand } from "../models/brand.model";
import type { BrandRepo } from "./brand.repo";

export class BrandApiRepo implements BrandRepo {
    /**
     * GET /admin/brands
     * @returns Brand[]
     */
    async getBrands(): Promise<ApiResponse<Brand[]>> {
        return apiClient.get<ApiResponse<Brand[]>>("/admin/brands");
    }
}
