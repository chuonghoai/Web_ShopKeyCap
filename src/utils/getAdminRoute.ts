import { ROLE } from "../core/constants/role.constant";
import { useAuth } from "../core/hooks/useAuth";

export const getAdminRoute = () => {
    const { user } = useAuth();
    if (user && user.role === ROLE.CLIENT) {
        return "/";
    }
    return "/admin";
};