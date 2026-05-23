import { useRoutes } from "react-router-dom";

import { clientRoutes } from "../apps/client/routes/client.routes";
import { adminRoutes } from "../apps/admin/routes/admin.routes";
import LoginPage from "../apps/auth/page/layout/authPage";

// MOCK DEMO page
const NotFoundPage = () => {
    return <h1>404 - Không tìm thấy trang</h1>;
};

export const AppRoutes = () => {
    const routes = useRoutes([
        {
            path: "/login",
            element: <LoginPage />,
        },

        ...clientRoutes,
        ...adminRoutes,

        {
            path: "*",
            element: <NotFoundPage />,
        }
    ]);

    return routes;
};