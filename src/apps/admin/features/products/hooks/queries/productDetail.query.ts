import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product.service";
import { productKeys } from "../product.keys";

export const useProductDetailQuery = (id: number) => {
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: async () => {
            const response = await productService.getProductById(id);
            return response;
        },
        enabled: !!id && id > 0,
    });
};
