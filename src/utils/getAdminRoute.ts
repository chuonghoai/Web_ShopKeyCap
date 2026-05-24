import { ROLE } from "../core/constants/role.constant";

export const getAdminRoute = (role: ROLE): string => {
    if (role === ROLE.CLIENT) {
        return "/";
    }
    return "/admin";
};