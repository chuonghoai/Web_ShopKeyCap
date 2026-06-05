import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../../service/cart.service';
import { cartKeys } from '../cartKeys';

export const useAddToCartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ variantId, quantity }: { variantId: string; quantity: number }) => {
            const res = await cartService.addToCart(variantId, quantity);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cartKeys.all });
        },
    });
};
