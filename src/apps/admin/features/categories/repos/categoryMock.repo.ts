import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Category } from "../models/category.model";
import type { CategoryRepo } from "./category.repo";

const mockCategories: Category[] = [
    { id: 1, name: "Bàn phím cơ", slug: "ban-phim-co" },
    { id: 2, name: "Keycap", slug: "keycap" },
    { id: 3, name: "Switch", slug: "switch" },
    { id: 4, name: "Phụ kiện", slug: "phu-kien" }
];

export class CategoryMockRepo implements CategoryRepo {
    async getCategories(): Promise<ApiResponse<Category[]>> {
        return new Promise(resolve => {
            setTimeout(() => resolve({
                success: true,
                message: "Success",
                data: mockCategories,
            }), 500);
        });
    }
}
