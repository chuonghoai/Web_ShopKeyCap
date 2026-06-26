import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { CategoryRepo } from "../repos/category.repo";
import { CategoryApiRepo } from "../repos/categoryApi.repo";
import { CategoryMockRepo } from "../repos/categoryMock.repo";

export class CategoryService {
    private readonly repo: CategoryRepo;

    constructor(categoryRepo: CategoryRepo) {
        this.repo = categoryRepo;
    }

    async getCategories() {
        return this.repo.getCategories();
    }
}

export const categoryService = new CategoryService(USE_MOCK ? new CategoryMockRepo() : new CategoryApiRepo());
