import { Navigate } from "react-router-dom";
import { ROLE } from "../constants/role.constant";
import { tokenService } from "./token.service";
import { useUserProfileQuery } from "../../apps/auth/features/hooks/queries/useUserProfileQuery";

interface Props {
    children: React.ReactNode;
    allowedRoles?: ROLE[];
    requireAuth?: boolean;
}

function AuthGuard({ children, allowedRoles, requireAuth = true }: Props) {
    const hasToken = !!tokenService.getAccessToken();
    const { data: user, isLoading } = useUserProfileQuery();

    if (requireAuth && !hasToken) {
        return <Navigate to="/login" replace />;
    }

    if (requireAuth && allowedRoles) {
        if (isLoading) return null;

        if (!user) {
            return <Navigate to="/login" replace />;
        }

        if (!allowedRoles.includes(user.role)) {
            return <Navigate to="/login?reason=unauthorized" replace />;
        }
    }

    return <>{children}</>;
}

export default AuthGuard;