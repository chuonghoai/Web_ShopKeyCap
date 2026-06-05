import { useQuery } from '@tanstack/react-query';
import { cartService } from '../../service/cart.service';
import { cartKeys } from '../cartKeys';

export const useCartQuery = () => {
    return useQuery({
        queryKey: cartKeys.items(),
        queryFn: async () => {
            const res = await cartService.getCarts();
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
    });
};
