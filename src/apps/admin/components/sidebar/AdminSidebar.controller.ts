import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../auth/features/hooks/mutations/useLogout.mutation";
import { useUserProfileQuery } from "../../../auth/features/hooks/queries/useUserProfile.query";
import type { User } from "../../../client/features/profile/models/user.model";

export const useAdminSidebarController = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const logout = useLogoutMutation();
    const user: User | null = useUserProfileQuery().data;

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const handleLogout = () => {
        logout.mutate();
        navigate("/login");
    };

    const isActive = (path: string) => {
        if (path === '/admin') {
            return location.pathname === '/admin';
        }
        return location.pathname.startsWith(path);
    };

    return {
        currentPath: location.pathname,
        user,
        isActive,
        handleNavigate,
        handleLogout,
    };
};
