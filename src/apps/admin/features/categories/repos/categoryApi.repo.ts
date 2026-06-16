import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Category } from "../models/category.model";

export const categoryApiRepo = {
    getCategories: async (): Promise<Category[]> => {
        const response = await apiClient.get<ApiResponse<Category[]>>("/admin/categories");
        return response.data;
    }
};
