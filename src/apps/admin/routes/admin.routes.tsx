import type { RouteObject } from "react-router-dom";
import AuthGuard from "../../../core/auth/auth.guard";
import { ERole } from "../../../core/constants/role.constant";
import AdminLayout from "../layout/adminLayout";

import { ProductListPage } from "../pages/products/ProductListPage";
import { ProductDetailPage } from "../pages/products/ProductDetailPage";
import { OrderListPage } from "../pages/orders/OrderListPage";
import { OrderDetailPage } from "../pages/orders/OrderDetailPage";

const AdminDashboardPage = () => {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
            <p className="text-muted-foreground">Chọn chức năng từ thanh menu bên trái.</p>
        </div>
    );
};

export const adminRoutes: RouteObject[] = [
    {
        element: (
            <AuthGuard requireAuth={true} allowedRoles={[ERole.ADMIN, ERole.STAFF]}>
                <AdminLayout />
            </AuthGuard>
        ),
        children: [
            { path: "/admin", element: <AdminDashboardPage /> },
            { path: "/admin/products", element: <ProductListPage /> },
            { path: "/admin/products/:id", element: <ProductDetailPage /> },
            { path: "/admin/orders", element: <OrderListPage /> },
            { path: "/admin/orders/:id", element: <OrderDetailPage /> },
        ]
    }
];
