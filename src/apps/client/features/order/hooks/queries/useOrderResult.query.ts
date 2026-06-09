import { useQuery } from '@tanstack/react-query';
import { orderCheckoutService } from '../../services/order-checkout.service';
import { orderKeys } from '../orderKeys';

export const useOrderResultQuery = (orderId: string) => {
    return useQuery({
        queryKey: orderKeys.result(orderId),
        queryFn: async () => {
            const res = await orderCheckoutService.getOrderResult(orderId);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        enabled: !!orderId,
    });
};
