import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services/auth.service';
import { userStorageService } from '../../../../../core/auth/userStorage.service';
import { tokenService } from '../../../../../core/auth/token.service';

export const useLogoutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await authService.logout();
            
            userStorageService.clear();
            tokenService.clear();
        },
        onSuccess: () => {
            queryClient.clear();
        },
    });
};
