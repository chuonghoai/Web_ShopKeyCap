import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services/auth.service';
import { profileKeys } from '../profileKeys';
import type { RegisterRequest } from '../../dto/register.dto';
import type { LoginResponse } from '../../dto/login.dto';

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: RegisterRequest) => {
            const res = await authService.register(data);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        onSuccess: (data: LoginResponse) => {
            queryClient.setQueryData(profileKeys.user(), data.user);
        },
    });
};
