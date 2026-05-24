import { Outlet } from "react-router-dom";
import { CartProvider } from "../features/cart/context/cart.provider";

function ClientLayout() {
    return (
        <CartProvider>
            <main>
                <Outlet />
            </main>
        </CartProvider>
    );
}

export default ClientLayout;