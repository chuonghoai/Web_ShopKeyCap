import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserProfileQuery } from "../../../../apps/auth/features/hooks/queries/useUserProfile.query";
import { useLogoutMutation } from "../../../../apps/auth/features/hooks/mutations/useLogout.mutation";
import { useCartCount } from "../../features/cart/hooks/useCartCount";

export const useHeaderController = () => {
    const { data: user } = useUserProfileQuery();
    const logoutMutation = useLogoutMutation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const cartCount = useCartCount();

    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        const urlKeyword = searchParams.get("keyword") || "";
        setKeyword(urlKeyword);
    }, [searchParams]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedKeyword = keyword.trim();
        
        if (trimmedKeyword) {
            navigate(`/products?keyword=${encodeURIComponent(trimmedKeyword)}`);
        } else {
            navigate("/products");
        }
    };

    const handleLogout = async () => {
        await logoutMutation.mutateAsync();
        navigate("/login");
    };

    return {
        user,
        handleLogout,
        cartCount,
        keyword,
        handleSearchChange,
        handleSearchSubmit,
    };
};