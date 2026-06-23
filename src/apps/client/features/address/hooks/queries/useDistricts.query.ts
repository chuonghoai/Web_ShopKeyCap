import { useQuery } from '@tanstack/react-query';
import { addressService } from '../../services/address.service';
import { addressKeys } from '../addressKeys';

export const useDistrictsQuery = (provinceId?: number) => {
    return useQuery({
        queryKey: provinceId ? addressKeys.districts(provinceId) : [],
        queryFn: async () => {
            if (!provinceId) return [];
            return await addressService.getDistricts(provinceId);
        },
        enabled: !!provinceId,
        staleTime: 60 * 60 * 1000, // 1 hour
        gcTime: 24 * 60 * 60 * 1000, // 24 hours
    });
};
