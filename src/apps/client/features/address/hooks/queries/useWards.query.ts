import { useQuery } from '@tanstack/react-query';
import { addressService } from '../../services/address.service';
import { addressKeys } from '../addressKeys';

export const useWardsQuery = (districtId?: number) => {
    return useQuery({
        queryKey: districtId ? addressKeys.wards(districtId) : [],
        queryFn: async () => {
            if (!districtId) return [];
            return await addressService.getWards(districtId);
        },
        enabled: !!districtId,
        staleTime: 60 * 60 * 1000, // 1 hour
        gcTime: 24 * 60 * 60 * 1000, // 24 hours
    });
};
