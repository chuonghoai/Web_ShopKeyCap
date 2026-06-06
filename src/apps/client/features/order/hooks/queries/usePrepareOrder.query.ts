import { useQuery } from '@tanstack/react-query';
import { orderCheckoutService } from '../../services/order-checkout.service';
import type { PrepareCheckoutRequest } from '../../dto/prepareCheckout.request';
import { orderKeys } from '../orderKeys';

export const usePrepareOrderQuery = (requests: PrepareCheckoutRequest[]) => {
    return useQuery({
        queryKey: orderKeys.prepareCheckout(requests),
        queryFn: async () => {
            const res = await orderCheckoutService.prepareOrder(requests);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        enabled: requests && requests.length > 0,
    });
};
