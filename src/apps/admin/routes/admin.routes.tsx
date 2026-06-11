import type { RouteObject } from "react-router-dom";
import AuthGuard from "../../../core/auth/auth.guard";
import AdminLayout from "../layout/adminLayout";
import { ERole } from "../../../core/constants/role.constant";

const AdminDashboardPage = () => {
    return <h1>Admin Dashboard (Bảo mật)</h1>;
};

export const adminRoutes: RouteObject[] = [
    {
        element: (
            <AuthGuard requireAuth={true} allowedRoles={[ERole.ADMIN, ERole.STAFF]}>
                <AdminLayout />
            </AuthGuard>
        ),
        children: [
            { path: "/admin", element: <AdminDashboardPage /> }
        ]
    }
];
