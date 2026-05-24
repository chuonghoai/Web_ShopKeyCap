import { useRoutes } from "react-router-dom";

import { clientRoutes } from "../apps/client/routes/client.routes";
import { adminRoutes } from "../apps/admin/routes/admin.routes";
import AuthPage from "../apps/auth/page/layout/authPage";
import AuthGuard from "../core/auth/auth.guard";

// MOCK DEMO page
const NotFoundPage = () => {
    return <h1>404 - Không tìm thấy trang</h1>;
};

const HomePage = () => {
    return <h1>Client Home (Công khai)</h1>;
};

export const AppRoutes = () => {
    const routes = useRoutes([
        { path: "/login", element: <AuthPage /> },
        { path: "/register", element: <AuthPage /> },
        { path: "/forgot-password", element: <AuthPage /> },
        { path: "/reset-password", element: <AuthPage /> },

        {
            path: "/",
            element: (
                <AuthGuard requireAuth={false}>
                    <HomePage />
                </AuthGuard>
            ),
        },

        ...clientRoutes,
        ...adminRoutes,

        { path: "*", element: <NotFoundPage /> }
    ]);

    return routes;
};