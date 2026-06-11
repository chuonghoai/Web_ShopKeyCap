import { ERole } from "../core/constants/role.constant";

export const getAdminRoute = (role: ERole): string => {
    if (role === ERole.USER) {
        return "/";
    }
    return "/admin";
};
