import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services/auth.service';
import { profileKeys } from '../profileKeys';
import type { LoginRequest, LoginResponse } from '../../dto/login.dto';

export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: LoginRequest) => {
            const res = await authService.login(data.email, data.password);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        onSuccess: (data: LoginResponse) => {
            queryClient.setQueryData(profileKeys.user(), data.user);
        },
    });
};

export const useLoginGoogleMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (idToken: string) => {
            const res = await authService.loginByGoogle(idToken);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        onSuccess: (data: LoginResponse) => {
            queryClient.setQueryData(profileKeys.user(), data.user);
        },
    });
};
