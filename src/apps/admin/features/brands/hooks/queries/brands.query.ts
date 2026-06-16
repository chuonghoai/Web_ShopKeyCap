import { useQuery } from "@tanstack/react-query";
import { brandService } from "../../services/brand.service";

export const brandKeys = {
    all: ['brands'] as const,
    lists: () => [...brandKeys.all, 'list'] as const,
};

export const useBrandsQuery = () => {
    return useQuery({
        queryKey: brandKeys.lists(),
        queryFn: () => brandService.getBrands(),
    });
};
