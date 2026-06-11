import { Navigate } from "react-router-dom";
import { tokenService } from "./token.service";
import { useUserProfileQuery } from "../../apps/auth/features/hooks/queries/useUserProfile.query";
import type { ERole } from "../constants/role.constant";

interface Props {
    children: React.ReactNode;
    allowedRoles?: ERole[];
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
