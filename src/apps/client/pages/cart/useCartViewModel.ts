import { useNavigate } from "react-router-dom";
import { useToastStore } from "../../../../core/store/useToastStore";
import { useCartQuery } from "../../features/cart/hooks/queries/useCartQuery";
import { useDeliveryInfoQuery } from "../../features/profile/hooks/queries/useDeliveryInfoQuery";
import { useRelatedProductsQuery } from "../../features/products/hooks/queries/useRelatedProductsQuery";
import { useUpdateCartItemMutation } from "../../features/cart/hooks/mutations/useUpdateCartItemMutation";
import { useDeleteCartItemMutation } from "../../features/cart/hooks/mutations/useDeleteCartItemMutation";
import { useEffect } from "react";
import { cartSummaryStorageService } from "../../features/cart/CartLocalStorage/CartSummaryStorage.service";

export const useCartViewModel = () => {
    const navigate = useNavigate();
    const toast = useToastStore(state => state.addToast);

    // Queries
    const { data: cartData, isLoading: loadingCart, refetch } = useCartQuery();
    const { data: deliveryInfo, isLoading: loadingDelivery } = useDeliveryInfoQuery();

    const uniqueProductIds = Array.from(new Set(cartData?.items.map((item: any) => item.product.id) || [])) as string[];
    const { data: relatedProducts, isLoading: loadingRelated } = useRelatedProductsQuery(uniqueProductIds);

    // Sync cart summary when cart data loaded
    useEffect(() => {
        if (cartData) {
            cartSummaryStorageService.save(cartData.summary.cartCount);
        }
    }, [cartData]);

    // Mutations
    const updateMutation = useUpdateCartItemMutation();
    const deleteMutation = useDeleteCartItemMutation();

    const handleUpdateQuantity = async (variantId: string, currentQuantity: number, change: number) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity > 0) {
            try {
                await updateMutation.mutateAsync({ variantId, quantity: newQuantity });
            } catch (err: any) {
                toast(err.message || "Không thể cập nhật số lượng", "error");
            }
        }
    };

    const handleDeleteItem = async (variantId: string) => {
        try {
            await deleteMutation.mutateAsync(variantId);
            toast("Đã xóa sản phẩm khỏi giỏ hàng", "success");
        } catch (err: any) {
            toast(err.message || "Xóa sản phẩm thất bại", "error");
        }
    };

    const handleCheckout = () => {
        if (!cartData || cartData.items.length === 0) return;
        navigate("/checkout");
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const handleAddAddress = () => {
        alert("Tính năng đang phát triển");
    };

    return {
        items: cartData?.items || [],
        totalPrice: cartData?.summary.total || 0,
        isLoading: loadingCart,
        
        deliveryInfo,
        loadingDelivery,

        relatedProducts: relatedProducts || [],
        loadingRelatedProducts: loadingRelated,

        handleUpdateQuantity,
        handleDeleteItem,
        handleCheckout,
        handleAddAddress,
        formatPrice,
        refetch,
    };
};
