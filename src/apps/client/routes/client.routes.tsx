import { Outlet, type RouteObject } from "react-router-dom";
import AuthGuard from "../../../core/auth/auth.guard";
import { ROLE } from "../../../core/constants/role.constant";
import ClientLayout from "../layout/clientLayout";

const ProfilePage = () => {
    return <h1>Thông tin cá nhân (Cần đăng nhập)</h1>;
};

const HomePage = () => {
    return <h1>Client Home (Công khai)</h1>;
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
                ]
            },

            /**
             * Private route
             */
            {
                element: (
                    <AuthGuard requireAuth={true} allowedRoles={[ROLE.CLIENT]}>
                        <Outlet />
                    </AuthGuard>
                ),
                children: [
                    { path: "/profile", element: <ProfilePage /> },
                ]
            }
        ]
    }
];