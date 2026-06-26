import { useQuery } from '@tanstack/react-query';
import { userStorageService } from '../../../../../core/auth/userStorage.service';
import { profileKeys } from '../profileKeys';

export const useUserProfileQuery = () => {
    return useQuery({
        queryKey: profileKeys.user(),
        queryFn: async () => {
            return userStorageService.getUser() || null;
        },
        staleTime: Infinity, // keep it forever until mutated
    });
};
