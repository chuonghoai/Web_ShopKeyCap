import { useQuery } from '@tanstack/react-query';
import { profileService } from '../../services/profile.service';
import { profileKeys } from '../../../../../auth/features/hooks/profileKeys';

export const useDeliveryInfoQuery = () => {
    return useQuery({
        queryKey: [...profileKeys.user(), 'delivery-info'],
        queryFn: async () => {
            const res = await profileService.getDefaultAddressAndShippingTime();
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
    });
};
