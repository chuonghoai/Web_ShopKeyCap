import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../../service/cart.service';
import { cartKeys } from '../cartKeys';
import type { CartDetailModel } from '../../model/cart.model';

export const useDeleteCartItemMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (variantId: number) => {
            const res = await cartService.deleteCartItem(variantId);
            if (!res.success) throw new Error(res.message);
            return { variantId, newTotalPrice: res.data?.totalPrice, newCartCount: res.data?.newCartCount };
        },
        onSuccess: ({ variantId, newTotalPrice, newCartCount }) => {
            if (newCartCount !== undefined) {
                queryClient.setQueryData(cartKeys.summary(), { cartCount: newCartCount });
            }

            queryClient.setQueryData(cartKeys.items(), (oldData: CartDetailModel | undefined) => {
                if (!oldData) return oldData;
                const newItems = oldData.items.filter(item => 
                    item.variant?.id !== variantId && item.product.id !== variantId
                );
                return {
                    ...oldData,
                    items: newItems,
                    summary: {
                        ...oldData.summary,
                        total: newTotalPrice ?? oldData.summary.total,
                        cartCount: newCartCount ?? oldData.summary.cartCount,
                    }
                };
            });
        },
    });
};
