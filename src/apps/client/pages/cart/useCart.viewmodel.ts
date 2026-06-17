import { useNavigate } from "react-router-dom";
import { useToastStore } from "../../../../core/store/useToastStore";
import { useCartQuery } from "../../features/cart/hooks/queries/useCart.query";
import { useDeliveryInfoQuery } from "../../features/address/hooks/queries/useDeliveryInfo.query";
import { useRelatedProductsQuery } from "../../features/products/hooks/queries/useRelatedProducts.query";
import { useUpdateCartItemMutation } from "../../features/cart/hooks/mutations/useUpdateCartItem.mutation";
import { useDeleteCartItemMutation } from "../../features/cart/hooks/mutations/useDeleteCartItem.mutation";
import type { CartItemModel } from "../../features/cart/model/cart.model";

export const useCartViewModel = () => {
    const navigate = useNavigate();
    const toast = useToastStore(state => state.addToast);

    // Queries
    const { data: cartData, isLoading: loadingCart, refetch } = useCartQuery();
    const { data: deliveryInfo, isLoading: loadingDelivery } = useDeliveryInfoQuery();

    const uniqueProductIds = Array.from(new Set(cartData?.items.map((item: any) => item.product.id) || [])) as number[];
    const { data: relatedProducts, isLoading: loadingRelated } = useRelatedProductsQuery(uniqueProductIds);

    // Mutations
    const updateMutation = useUpdateCartItemMutation();
    const deleteMutation = useDeleteCartItemMutation();

    const handleUpdateQuantity = async (variantId: number, newQuantity: number) => {
        if (newQuantity > 0) {
            try {
                await updateMutation.mutateAsync({ variantId, quantity: newQuantity });
            } catch (err: any) {
                toast(err.message || "Không thể cập nhật số lượng", "error");
            }
        }
    };

    const handleDeleteItem = async (variantId: number) => {
        try {
            await deleteMutation.mutateAsync(variantId);
            toast("Đã xóa sản phẩm khỏi giỏ hàng", "success");
        } catch (err: any) {
            toast(err.message || "Xóa sản phẩm thất bại", "error");
        }
    };

    const handleCheckout = () => {
        if (!cartData || cartData.items.length === 0) return;

        const items = cartData.items.map((item: CartItemModel) => ({
            variantId: item.variant.id,
            quantity: item.variant.quantity
        }));

        const cartItemIds = cartData.items.map((item: any) => item.id);

        navigate("/checkout", {
            state: {
                cartItemIds,
                items
            }
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
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
        formatPrice,
        refetch,
    };
};
