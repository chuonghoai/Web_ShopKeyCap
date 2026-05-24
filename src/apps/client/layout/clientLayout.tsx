import { Outlet } from "react-router-dom";
import { CartProvider } from "../features/cart/context/cart.provider";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function ClientLayout() {
    return (
        <CartProvider>
            <div className="min-h-screen w-full bg-[#f1f5f9] flex flex-col">
                <Header />

                <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 flex flex-col">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </CartProvider>
    );
}

export default ClientLayout;