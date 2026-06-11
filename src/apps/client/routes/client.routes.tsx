import { Outlet, Navigate, type RouteObject } from "react-router-dom";
import AuthGuard from "../../../core/auth/auth.guard";
import ClientLayout from "../layout/clientLayout";
import { HomePage } from "../pages/homepage/homepage";
import ProductsPage from "../pages/products/productsPage";
import ProductDetailPage from "../pages/productDetail/productDetailPage";
import CartPage from "../pages/cart/cartPage";
import OrderCheckoutPage from "../pages/orderCheckout/OrderCheckoutPage";
import OrderResultPage from "../pages/orderResult/OrderResultPage";

import UserLayout from "../pages/user/UserLayout";
import ProfilePage from "../pages/user/profile/ProfilePage";
import OrderListPage from "../pages/user/orders/OrderListPage";
import OrderDetailPage from "../pages/user/orders/OrderDetailPage";
import { ERole } from "../../../core/constants/role.constant";

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
                    <AuthGuard requireAuth={true} allowedRoles={[ERole.USER]}>
                        <Outlet />
                    </AuthGuard>
                ),
                children: [
                    {
                        path: "/user",
                        element: <UserLayout />,
                        children: [
                            { index: true, element: <Navigate to="profile" replace /> },
                            { path: "profile", element: <ProfilePage /> },
                            { path: "orders", element: <OrderListPage /> },
                            { path: "orders/:id", element: <OrderDetailPage /> },
                        ]
                    },
                    { path: "/cart", element: <CartPage /> },
                    { path: "/checkout", element: <OrderCheckoutPage /> },
                    { path: "/order/checkout/result", element: <OrderResultPage /> },
                ]
            }
        ]
    }
];
