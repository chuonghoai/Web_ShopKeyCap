import { useState, useEffect, type ReactNode } from "react";
import { CartContext } from "./cart.context";
import { useAuth } from "../../../../../core/hooks/useAuth";
import { ROLE } from "../../../../../core/constants/role.constant";
import { cartSummaryStorageService } from "../CartLocalStorage/CartSummaryStorage.service";
import { useToast } from "../../../../../components/toast/toast";
import { cartService } from "../service/cart.service";

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [cartCount, setCartCount] = useState<number>(0);

    const fetchCartSummary = async () => {
        try {
            const response = await cartService.getCartSummary();

            setCartCount(response.data.cartCount);
            cartSummaryStorageService.save(response.data.cartCount);
        } catch (error) {
            toast("Lỗi khi lấy thông tin giỏ hàng:", "error");
        }
    };

    const syncCartCount = (newCartCount: number) => {
        setCartCount(newCartCount);
        cartSummaryStorageService.save(newCartCount);
    };
    useEffect(() => {
        if (!user) {
            setCartCount(0);
            return;
        }

        if (user.role === ROLE.ADMIN) {
            setCartCount(0);
            return;
        }

        const cachedCartCount = cartSummaryStorageService.get();

        if (cachedCartCount) {
            setCartCount(cachedCartCount);
        } else {
            fetchCartSummary();
        }
    }, [user]);

    return (
        <CartContext.Provider value={{ cartCount, fetchCartSummary, syncCartCount }}>
            {children}
        </CartContext.Provider>
    );
};