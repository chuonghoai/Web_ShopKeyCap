import { useQuery } from "@tanstack/react-query";
import { brandService } from "../../services/brand.service";
import { brandKeys } from "../brand.keys";

export const useBrandsQuery = () => {
    return useQuery({
        queryKey: brandKeys.lists(),
        queryFn: () => brandService.getBrands(),
    });
};
