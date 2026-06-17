import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Category } from "../models/category.model";
import type { CategoryRepo } from "./category.repo";

export class CategoryApiRepo implements CategoryRepo {
    /**
     * GET /admin/categories
     * @returns Category[]
     */
    async getCategories(): Promise<ApiResponse<Category[]>> {
        return apiClient.get<ApiResponse<Category[]>>("/admin/categories");
    }
}
