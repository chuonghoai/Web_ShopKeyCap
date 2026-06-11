import { useQuery } from '@tanstack/react-query';
import { addressService } from '../../services/address.service';
import { addressKeys } from '../addressKeys';

export const useDeliveryInfoQuery = (addressId?: number) => {
    return useQuery({
        queryKey: addressKeys.shipping(addressId),
        queryFn: async () => {
            const res = await addressService.getShippingInfo(addressId);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
    });
};
