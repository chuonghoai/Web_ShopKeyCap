import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useAuth } from "../../../../../core/hooks/useAuth";
import { ROLE } from "../../../../../core/constants/role.constant";

interface CartContextType {
    cartItems: any[]; // Thay thế bằng Model sản phẩm của bạn
    cartCount: number;
    addToCart: (item: any) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<any[]>([]);

    // Logic kiểm tra và đồng bộ giỏ hàng
    useEffect(() => {
        // Nếu là Admin, chủ động xóa sạch state giỏ hàng và không chạy logic tiếp theo
        if (user && user.role === ROLE.ADMIN) {
            setCartItems([]);
            return;
        }

        // Logic lấy giỏ hàng từ localStorage hoặc API cho Client
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, [user]);

    const addToCart = (item: any) => {
        if (user && user.role === ROLE.ADMIN) return; // Chặn admin thêm hàng
        setCartItems((prev) => [...prev, item]);
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, cartCount: cartItems.length, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        // Trả về giá trị mặc định trống thay vì crash app nếu vô tình gọi ở nơi không có Provider (như trang Admin)
        return { cartItems: [], cartCount: 0, addToCart: () => { }, clearCart: () => { } };
    }
    return context;
};