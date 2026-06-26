import { useQuery } from '@tanstack/react-query';
import { orderCheckoutService } from '../../services/order-checkout.service';
import type { PrepareCheckoutRequest } from '../../dto/prepareCheckout.request';
import { orderKeys } from '../orderKeys';

export const usePrepareOrderQuery = (requests: PrepareCheckoutRequest[], addressId?: number) => {
    return useQuery({
        queryKey: orderKeys.prepareCheckout(requests, addressId),
        queryFn: async () => {
            const res = await orderCheckoutService.prepareOrder({ items: requests, addressId });
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        enabled: requests && requests.length > 0,
    });
};
