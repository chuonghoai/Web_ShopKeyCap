import type { Category } from "../models/category.model";

const mockCategories: Category[] = [
    { id: 1, name: "Bàn phím cơ", slug: "ban-phim-co" },
    { id: 2, name: "Keycap", slug: "keycap" },
    { id: 3, name: "Switch", slug: "switch" },
    { id: 4, name: "Phụ kiện", slug: "phu-kien" }
];

export const categoryMockRepo = {
    getCategories: async (): Promise<Category[]> => {
        return new Promise(resolve => {
            setTimeout(() => resolve(mockCategories), 500);
        });
    }
};
