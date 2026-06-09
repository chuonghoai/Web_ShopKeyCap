import { Outlet, type RouteObject } from "react-router-dom";
import AuthGuard from "../../../core/auth/auth.guard";
import { ROLE } from "../../../core/constants/role.constant";
import ClientLayout from "../layout/clientLayout";
import { HomePage } from "../pages/homepage/homepage";
import ProductsPage from "../pages/products/productsPage";
import ProductDetailPage from "../pages/productDetail/productDetailPage";
import CartPage from "../pages/cart/cartPage";
import OrderCheckoutPage from "../pages/orderCheckout/OrderCheckoutPage";
import OrderResultPage from "../pages/orderResult/OrderResultPage";

const ProfilePage = () => {
    return <h1>Thông tin cá nhân (Cần đăng nhập)</h1>;
};

export const clientRoutes: RouteObject[] = [
    {
        element: <ClientLayout />,
        children: [
            /**
             * Public route
             */
            {
                element: (
                    <AuthGuard requireAuth={false}>
                        <Outlet />
                    </AuthGuard>
                ),
                children: [
                    { path: "/", element: <HomePage /> },
                    { path: "/products", element: <ProductsPage /> },
                    { path: "/product/:slug", element: <ProductDetailPage /> }
                ]
            },

            /**
             * Private route
             */
            {
                element: (
                    <AuthGuard requireAuth={true} allowedRoles={[ROLE.USER]}>
                        <Outlet />
                    </AuthGuard>
                ),
                children: [
                    { path: "/profile", element: <ProfilePage /> },
                    { path: "/cart", element: <CartPage /> },
                    { path: "/checkout", element: <OrderCheckoutPage /> },
                    { path: "/order/checkout/result", element: <OrderResultPage /> },
                ]
            }
        ]
    }
];