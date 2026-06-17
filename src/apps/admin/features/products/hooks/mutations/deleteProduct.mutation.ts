import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../../services/product.service";
import { productKeys } from "../product.keys";

export const useDeleteProductMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => productService.deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
};
