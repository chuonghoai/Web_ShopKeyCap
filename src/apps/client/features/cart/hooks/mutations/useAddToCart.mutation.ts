import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../../service/cart.service';
import { cartKeys } from '../cartKeys';

export const useAddToCartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ variantId, quantity }: { variantId: number; quantity: number }) => {
            const res = await cartService.addToCart(variantId, quantity);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        onSuccess: (data) => {
            if (data?.newCartCount !== undefined) {
                queryClient.setQueryData(cartKeys.summary(), { cartCount: data.newCartCount });
            }
            queryClient.invalidateQueries({ queryKey: cartKeys.all });
        },
    });
};
