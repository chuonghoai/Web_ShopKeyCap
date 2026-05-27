import { createContext } from "react";

export interface CartContextType {
    cartCount: number;
    fetchCartSummary: () => Promise<void>;
    syncCartCount: (newCartCount: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);