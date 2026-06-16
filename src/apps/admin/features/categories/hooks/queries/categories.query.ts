import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../../services/category.service";

export const categoryKeys = {
    all: ['categories'] as const,
    lists: () => [...categoryKeys.all, 'list'] as const,
};

export const useCategoriesQuery = () => {
    return useQuery({
        queryKey: categoryKeys.lists(),
        queryFn: () => categoryService.getCategories(),
    });
};
