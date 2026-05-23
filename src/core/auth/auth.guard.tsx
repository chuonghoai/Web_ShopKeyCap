import { Navigate } from "react-router-dom";
import { userStorageService } from "./userStorage.service";
import { ROLE } from "../constants/role.constant";

interface Props {
    children: React.ReactNode;
    allowedRoles?: ROLE[];
    requireAuth?: boolean;
}

function AuthGuard({ children, allowedRoles, requireAuth = true }: Props) {
    const user = userStorageService.getUser();

    if (requireAuth && !user) {
        return <Navigate to="/login" replace />;
    }

    if (user && allowedRoles) {
        if (!allowedRoles.includes(user.role)) {
            return <Navigate to="/login?reason=unauthorized" replace />;
        }
    }

    return <>{children}</>;
}

export default AuthGuard;