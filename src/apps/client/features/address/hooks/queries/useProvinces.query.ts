import { useQuery } from '@tanstack/react-query';
import { addressService } from '../../services/address.service';
import { addressKeys } from '../addressKeys';

export const useProvincesQuery = (enabled: boolean = true) => {
    return useQuery({
        queryKey: addressKeys.provinces(),
        queryFn: async () => {
            return await addressService.getProvinces();
        },
        enabled,
        staleTime: 60 * 60 * 1000, // 1 hour
        gcTime: 24 * 60 * 60 * 1000, // 24 hours
    });
};
