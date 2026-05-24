import { useState, useEffect, type ReactNode } from "react";
import { CartContext } from "./cart.context";
import { useAuth } from "../../../../../core/hooks/useAuth";
import { ROLE } from "../../../../../core/constants/role.constant";
import type { CartSummaryModel } from "../model/summary.model";
import { cartSummaryStorageService } from "../CartLocalStorage/CartSummaryStorage.service";
import { useToast } from "../../../../../components/toast/toast";

const mockFetchCartSummaryAPI = async (): Promise<CartSummaryModel> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ cartCount: 5 }), 500);
    });
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [cartCount, setCartCount] = useState<number>(0);

    const fetchCartSummary = async () => {
        try {
            const data = await mockFetchCartSummaryAPI();

            setCartCount(data.cartCount);
            cartSummaryStorageService.save(data.cartCount);
        } catch (error) {
            toast("Lỗi khi lấy thông tin giỏ hàng:", "error");
        }
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
        <CartContext.Provider value={{ cartCount, fetchCartSummary }}>
            {children}
        </CartContext.Provider>
    );
};