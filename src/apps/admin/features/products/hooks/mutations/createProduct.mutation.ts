import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../../services/product.service";
import { productKeys } from "../product.keys";
import type { CreateProductRequest } from "../../models/create-product.request";

export const useCreateProductMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateProductRequest) => productService.createProduct(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
};
