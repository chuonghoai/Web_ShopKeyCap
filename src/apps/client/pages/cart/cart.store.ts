import { useState, useEffect, useCallback } from "react";
import { cartService } from "../../features/cart/service/cart.service";
import { cartSyncManager } from "../../features/cart/service/cartUpdate.debouncer";
import type { CartItemModel } from "../../features/cart/model/cart.model";
import { useToast } from "../../../../components/toast/toast";
import { useCart } from "../../features/cart/hooks/useCart";

export const useCartStore = () => {
    const { toast } = useToast();
    const { syncCartCount } = useCart();
    const [items, setItems] = useState<CartItemModel[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    /**
     * Fetch data carts
     */
    const fetchCarts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await cartService.getCarts();
            if (response.data) {
                setItems(response.data.items);
                setTotalPrice(response.data.summary.total);
                syncCartCount(response.data.summary.cartCount);
            }
        } catch (error: any) {
            toast(error.message || "Lỗi khi lấy dữ liệu giỏ hàng", "error");
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchCarts();
        cartSyncManager.registerSyncCallback(syncCartCount);
    }, [fetchCarts]);

    /**
     * Update cart quantity and sync with cart count on header
     */
    const updateItemQuantity = async (variantId: string, newQuantity: number) => {
        if (newQuantity <= 0) return;

        setItems(prevItems => prevItems.map(item => {
            if (item.variant?.id === variantId || item.product.id === variantId) {
                if (item.variant) {
                    return { ...item, variant: { ...item.variant, quantity: newQuantity } };
                }
            }
            return item;
        }));

        try {
            const newTotalPrice = await cartSyncManager.updateCartItem(variantId, newQuantity);
            setTotalPrice(newTotalPrice);
        } catch (error: any) {
            toast(error.message || "Không thể cập nhật số lượng", "error");
            fetchCarts();
        }
    };

    /**
     * Delete cart item and sync with cart count on header
     */
    const deleteItem = async (variantId: string) => {
        try {
            const response = await cartService.deleteCartItem(variantId);
            if (response.data) {
                setItems(prevItems => prevItems.filter(item =>
                    item.variant?.id !== variantId && item.product.id !== variantId
                ));
                setTotalPrice(response.data.totalPrice || 0);
                syncCartCount(response.data.newCartCount);

                toast("Đã xóa sản phẩm khỏi giỏ hàng", "success");
            }
            else if (!response.success) {
                toast(response.message, "error");
            }
        } catch (error: any) {
            toast(error.message || "Xóa sản phẩm thất bại", "error");
        }
    };

    return {
        items,
        totalPrice,
        isLoading,
        updateItemQuantity,
        deleteItem,
        refetch: fetchCarts,
    };
};
