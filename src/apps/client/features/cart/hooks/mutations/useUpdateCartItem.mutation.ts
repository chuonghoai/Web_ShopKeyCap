import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartSyncManager } from '../../service/cartUpdate.debouncer';
import { cartKeys } from '../cartKeys';
import type { CartDetailModel } from '../../model/cart.model';

export const useUpdateCartItemMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ variantId, quantity }: { variantId: number; quantity: number }) => {
            const newTotalPrice = await cartSyncManager.updateCartItem(variantId, quantity);
            return { variantId, quantity, newTotalPrice };
        },
        onMutate: async ({ variantId, quantity }) => {
            await queryClient.cancelQueries({ queryKey: cartKeys.items() });

            const previousData = queryClient.getQueryData<CartDetailModel>(cartKeys.items());

            queryClient.setQueryData(cartKeys.items(), (oldData: CartDetailModel | undefined) => {
                if (!oldData) return oldData;
                const newItems = oldData.items.map(item => {
                    if (item.variant?.id === variantId || item.product.id === variantId) {
                        if (item.variant) {
                            return { ...item, variant: { ...item.variant, quantity } };
                        }
                    }
                    return item;
                });
                const newCartCount = newItems.reduce((sum, item) => sum + (item.variant?.quantity || 1), 0);
                
                queryClient.setQueryData(cartKeys.summary(), { cartCount: newCartCount });

                return {
                    ...oldData,
                    items: newItems,
                    summary: {
                        ...oldData.summary,
                        cartCount: newCartCount,
                    }
                };
            });

            return { previousData };
        },
        onError: (_err, _variables, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(cartKeys.items(), context.previousData);
                const oldCartCount = context.previousData.items.reduce((sum, item) => sum + (item.variant?.quantity || 1), 0);
                queryClient.setQueryData(cartKeys.summary(), { cartCount: oldCartCount });
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: cartKeys.items() });
        },
        onSuccess: ({ variantId, quantity, newTotalPrice }) => {
            queryClient.setQueryData(cartKeys.items(), (oldData: CartDetailModel | undefined) => {
                if (!oldData) return oldData;
                const newItems = oldData.items.map(item => {
                    if (item.variant?.id === variantId || item.product.id === variantId) {
                        if (item.variant) {
                            return { ...item, variant: { ...item.variant, quantity } };
                        }
                    }
                    return item;
                });
                const newCartCount = newItems.reduce((sum, item) => sum + (item.variant?.quantity || 1), 0);

                return {
                    ...oldData,
                    items: newItems,
                    summary: {
                        ...oldData.summary,
                        total: newTotalPrice,
                        cartCount: newCartCount,
                    }
                };
            });
        },
    });
};
