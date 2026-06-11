import { ERole } from "../core/constants/ERole.constant";

export const getAdminRoute = (ERole: ERole): string => {
    if (ERole === ERole.USER) {
        return "/";
    }
    return "/admin";
};
