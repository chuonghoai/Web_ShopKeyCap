import type { RouteObject } from "react-router-dom";
import AuthGuard from "../../../core/auth/auth.guard";
import { ERole } from "../../../core/constants/role.constant";
import AdminLayout from "../layout/adminLayout";

import { ProductListPage } from "../pages/products/ProductListPage";
import { ProductDetailPage } from "../pages/products/ProductDetailPage";
import { OrderListPage } from "../pages/orders/OrderListPage";
import { OrderDetailPage } from "../pages/orders/OrderDetailPage";
import { StaffManagementPage } from "../pages/staff/StaffManagementPage";

import { DashboardPage } from "../pages/dashboard";

export const adminRoutes: RouteObject[] = [
    {
        element: (
            <AuthGuard requireAuth={true} allowedRoles={[ERole.ADMIN, ERole.STAFF]}>
                <AdminLayout />
            </AuthGuard>
        ),
        children: [
            { path: "/admin", element: <DashboardPage /> },
            { path: "/admin/products", element: <ProductListPage /> },
            { path: "/admin/products/:id", element: <ProductDetailPage /> },
            { path: "/admin/orders", element: <OrderListPage /> },
            { path: "/admin/orders/:id", element: <OrderDetailPage /> },
            { path: "/admin/staffs", element: <StaffManagementPage /> },
        ]
    }
];
