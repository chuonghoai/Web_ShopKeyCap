import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Brand } from "../models/brand.model";

export interface BrandRepo {
    getBrands(): Promise<ApiResponse<Brand[]>>;
}
