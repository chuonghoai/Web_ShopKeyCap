import { useState, useEffect, useCallback } from "react";
import { cartService } from "../../features/cart/service/cart.service";
import { cartSyncManager } from "../../features/cart/service/cartUpdate.debouncer";
import type { CartItemModel } from "../../features/cart/model/cart.model";
import { useToast } from "../../../../components/toast/toast";
import { useCart } from "../../features/cart/hooks/useCart";
import { productService } from "../../features/products/services/product.service";
import type { ProductItem } from "../../features/products/model/product.model";
import { profileService } from "../../features/profile/services/profile.service";
import type { DeliveryInfoModel } from "../../features/profile/models/address.model";

export const useCartStore = () => {
    const { toast } = useToast();
    const { syncCartCount } = useCart();
    const [items, setItems] = useState<CartItemModel[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [relatedProducts, setRelatedProducts] = useState<ProductItem[]>([]);
    const [loadingRelatedProducts, setLoadingRelatedProducts] = useState<boolean>(false);

    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoModel | null>(null);
    const [loadingDelivery, setLoadingDelivery] = useState<boolean>(true);

    /**
     * Fetch data carts
     */
    const fetchCarts = useCallback(async () => {
        setIsLoading(true);
        setLoadingDelivery(true);
        setLoadingRelatedProducts(true);
        try {
            // Fetch cart and shipping time
            const [cartRes, deliveryRes] = await Promise.all([
                cartService.getCarts(),
                profileService.getDefaultAddressAndShippingTime()
            ]);

            if (deliveryRes.data) {
                setDeliveryInfo(deliveryRes.data);
            }

            if (cartRes.data) {
                const cartItems = cartRes.data.items;
                setItems(cartItems);
                setTotalPrice(cartRes.data.summary.total);
                syncCartCount(cartRes.data.summary.cartCount);

                // Fetch product relate to cart items
                const uniqueProductIds = Array.from(new Set(cartItems.map(item => item.product.id)));
                if (uniqueProductIds.length > 0) {
                    productService.getRelatedProducts(uniqueProductIds).then(relatedRes => {
                        if (relatedRes.data) {
                            setRelatedProducts(relatedRes.data);
                        }
                    }).finally(() => {
                        setLoadingRelatedProducts(false);
                    });
                } else {
                    setLoadingRelatedProducts(false);
                }
            } else {
                setLoadingRelatedProducts(false);
            }
        } catch (error: any) {
            toast(error.message || "Lỗi khi lấy dữ liệu", "error");
            setLoadingRelatedProducts(false);
        } finally {
            setIsLoading(false);
            setLoadingDelivery(false);
        }
    }, [toast, syncCartCount]);

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
        relatedProducts,
        loadingRelatedProducts,
        deliveryInfo,
        loadingDelivery,
        updateItemQuantity,
        deleteItem,
        refetch: fetchCarts,
    };
};
