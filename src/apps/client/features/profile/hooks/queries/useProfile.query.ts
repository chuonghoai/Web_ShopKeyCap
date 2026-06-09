import { useQuery } from '@tanstack/react-query';
import { profileService } from '../../services/profile.service';
import { profileKeys } from '../profileKeys';
import { userStorageService } from '../../../../../../core/auth/userStorage.service';

export const useProfileQuery = () => {
    return useQuery({
        queryKey: profileKeys.detail(),
        queryFn: async () => {
            const res = await profileService.getProfile();
            if (!res.success) {
                throw new Error(res.message || 'Lấy thông tin cá nhân thất bại');
            }
            if (!res.data) {
                throw new Error('Dữ liệu thông tin cá nhân trống');
            }
            return res.data;
        },
        staleTime: Infinity,
        gcTime: 10 * 60 * 1000,
        placeholderData: () => {
            const user = userStorageService.getUser();
            if (!user) return undefined;
            return {
                ...user,
                stats: { totalOrders: undefined, completedOrders: undefined, wishlistItems: undefined },
            };
        },
    });
};
