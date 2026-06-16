import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Brand } from "../models/brand.model";

export const brandApiRepo = {
    getBrands: async (): Promise<Brand[]> => {
        const response = await apiClient.get<ApiResponse<Brand[]>>("/admin/brands");
        return response.data;
    }
};
