import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { orderCheckoutService } from '../../services/order-checkout.service';
import { orderKeys } from '../orderKeys';
import type { CheckoutResult } from '../../models/checkoutResult.dto';

export const useOrderResultQuery = (
    orderId: number, 
    options?: Omit<UseQueryOptions<CheckoutResult, Error>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        queryKey: orderKeys.result(orderId),
        queryFn: async () => {
            const res = await orderCheckoutService.getOrderResult(orderId);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        enabled: !!orderId,
        ...options,
    });
};
