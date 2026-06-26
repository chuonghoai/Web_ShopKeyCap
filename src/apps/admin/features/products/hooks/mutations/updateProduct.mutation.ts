import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../../services/product.service";
import { productKeys } from "../product.keys";
import type { UpdateProductRequest } from "../../models/update-product.request";

export const useUpdateProductMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: UpdateProductRequest) => productService.updateProduct(request),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
};
