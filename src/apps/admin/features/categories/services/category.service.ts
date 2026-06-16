import { categoryApiRepo } from "../repos/categoryApi.repo";
import { categoryMockRepo } from "../repos/categoryMock.repo";
import type { Category } from "../models/category.model";
import { USE_MOCK } from "../../../../../core/config/useMock.config";

export const categoryService = {
    getCategories: async (): Promise<Category[]> => {
        if (USE_MOCK) {
            return categoryMockRepo.getCategories();
        }
        return categoryApiRepo.getCategories();
    }
};
