import { useCartStore } from "./cart.store";
import { useNavigate } from "react-router-dom";

export const useCartController = () => {
    const store = useCartStore();
    const navigate = useNavigate();

    const handleUpdateQuantity = (variantId: string, currentQuantity: number, change: number) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity > 0) {
            store.updateItemQuantity(variantId, newQuantity);
        }
    };

    const handleDeleteItem = (variantId: string) => {
        store.deleteItem(variantId);
    };

    const handleCheckout = () => {
        if (store.items.length === 0) return;
        navigate("/checkout");
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    return {
        ...store,
        handleUpdateQuantity,
        handleDeleteItem,
        handleCheckout,
        formatPrice,
    };
};
