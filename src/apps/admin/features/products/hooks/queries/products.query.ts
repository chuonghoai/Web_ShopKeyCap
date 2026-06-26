import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product.service";
import { productKeys } from "../product.keys";

export const useProductsQuery = (page: number, limit?: number, search?: string) => {
    return useQuery({
        queryKey: productKeys.list({ page, limit, search }),
        queryFn: async () => {
            const response = await productService.getProducts(page, limit, search);
            return response;
        },
    });
};
