import { useNavigate } from "react-router-dom";
import { useUserProfileQuery } from "../../../../apps/auth/features/hooks/queries/useUserProfile.query";
import { useLogoutMutation } from "../../../../apps/auth/features/hooks/mutations/useLogout.mutation";
import { useCartCount } from "../../features/cart/hooks/useCartCount";

export const useHeaderController = () => {
    const { data: user } = useUserProfileQuery();
    const logoutMutation = useLogoutMutation();
    const navigate = useNavigate();
    const cartCount = useCartCount();

    const handleLogout = async () => {
        await logoutMutation.mutateAsync();
        navigate("/login");
    };

    return {
        user,
        handleLogout,
        cartCount,
    };
};