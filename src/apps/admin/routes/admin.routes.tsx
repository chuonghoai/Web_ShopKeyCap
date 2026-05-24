import type { RouteObject } from "react-router-dom";
import AuthGuard from "../../../core/auth/auth.guard";
import { ROLE } from "../../../core/constants/role.constant";
import AdminLayout from "../layout/adminLayout";

const AdminDashboardPage = () => {
    return <h1>Admin Dashboard (Bảo mật)</h1>;
};

export const adminRoutes: RouteObject[] = [
    {
        element: (
            <AuthGuard requireAuth={true} allowedRoles={[ROLE.ADMIN, ROLE.STAFF]}>
                <AdminLayout />
            </AuthGuard>
        ),
        children: [
            { path: "/admin", element: <AdminDashboardPage /> }
        ]
    }
];