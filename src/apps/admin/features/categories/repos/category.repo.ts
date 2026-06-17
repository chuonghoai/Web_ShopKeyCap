import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Category } from "../models/category.model";

export interface CategoryRepo {
    getCategories(): Promise<ApiResponse<Category[]>>;
}
