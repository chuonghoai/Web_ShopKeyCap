import { useQuery } from '@tanstack/react-query';
import { addressService } from '../../services/address.service';
import { addressKeys } from '../addressKeys';

export const useAddressesQuery = (enabled: boolean = true) => {
    return useQuery({
        queryKey: addressKeys.lists(),
        queryFn: async () => {
            const res = await addressService.getAddresses();
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        enabled,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
