import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../../services/profile.service';
import type { Profile, UpdateProfileDto } from '../../models/profile.model';
import type { User } from '../../models/user.model';
import { profileKeys } from '../profileKeys';
import { userStorageService } from '../../../../../../core/auth/userStorage.service';
import { profileKeys as authProfileKeys } from '../../../../../../apps/auth/features/hooks/profileKeys';

export const useUpdateProfileMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateProfileDto) => {
            const res = await profileService.updateProfile(data);
            if (!res.success || !res.data) {
                throw new Error(res.message || 'Cập nhật thông tin thất bại');
            }
            return res.data;
        },
        onSuccess: (updatedProfile) => {
            const currentUser = userStorageService.getUser();
            if (currentUser) {
                userStorageService.saveUser({
                    ...currentUser,
                    fullName: updatedProfile.fullName,
                    avatar: updatedProfile.avatar,
                });
            }

            queryClient.setQueryData<User>(authProfileKeys.user(), (old) => {
                if (!old) return old;
                return {
                    ...old,
                    fullName: updatedProfile.fullName,
                    avatar: updatedProfile.avatar,
                };
            });

            queryClient.setQueryData<Profile>(profileKeys.detail(), (old) => {
                if (!old) return old;
                return {
                    ...old,
                    fullName: updatedProfile.fullName,
                    phoneNumber: updatedProfile.phoneNumber,
                    avatar: updatedProfile.avatar,
                };
            });
        },
    });
};
