import { useContext } from "react";
import { CartContext } from "../context/cart.context";

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        return {
            cartCount: 0,
            fetchCartSummary: async () => { },
            syncCartCount: () => { }
        };
    }

    return context;
};