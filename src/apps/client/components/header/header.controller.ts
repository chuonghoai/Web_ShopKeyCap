import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../core/hooks/useAuth";

export const useHeaderController = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (logout) {
            logout();
            navigate("/login");
        }
    };

    return {
        user,
        handleLogout,
    };
};