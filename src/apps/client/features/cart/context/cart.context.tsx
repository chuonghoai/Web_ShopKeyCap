import { createContext } from "react";

export interface CartContextType {
    cartCount: number;
    fetchCartSummary: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);