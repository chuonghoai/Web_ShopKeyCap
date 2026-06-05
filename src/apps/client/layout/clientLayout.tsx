import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function ClientLayout() {
    return (
        <div className="min-h-screen w-full bg-[#f1f5f9] flex flex-col">
            <Header />

            <main className="flex-1 w-full px-6 pt-4 pb-4 flex flex-col">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default ClientLayout;