import { useState, useEffect, type ReactNode } from "react";
import { userStorageService } from "./userStorage.service";
import { User } from "../../apps/client/features/profile/models/user.model";
import { tokenService } from "./token.service";
import { AuthContext } from "./auth.context";
import { cartSummaryStorageService } from "../../apps/client/features/cart/CartLocalStorage/CartSummaryStorage.service";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = userStorageService.getUser();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        userStorageService.saveUser(userData);
    };

    const logout = () => {
        setUser(null);
        userStorageService.clear();
        cartSummaryStorageService.clear();
        tokenService.clear();
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};