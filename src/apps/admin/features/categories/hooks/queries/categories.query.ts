import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../../services/category.service";
import { categoryKeys } from "../categories.keys";

export const useCategoriesQuery = () => {
    return useQuery({
        queryKey: categoryKeys.lists(),
        queryFn: () => categoryService.getCategories(),
    });
};
