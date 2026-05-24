import type { RouteObject } from "react-router-dom";
import AuthGuard from "../../../core/auth/auth.guard";
import { ROLE } from "../../../core/constants/role.constant";

const ProfilePage = () => {
    return <h1>Thông tin cá nhân (Cần đăng nhập)</h1>;
};

const HomePage = () => {
    return <h1>Client Home (Công khai)</h1>;
};

export const clientRoutes: RouteObject[] = [
    {
        path: "/",
        element: (
            <AuthGuard requireAuth={false}>
                <HomePage />
            </AuthGuard>
        ),
    },
    {
        path: "/profile",
        element: (
            <AuthGuard requireAuth={true} allowedRoles={[ROLE.CLIENT]}>
                <ProfilePage />
            </AuthGuard>
        ),
    }
];