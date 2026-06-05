import { useQuery } from '@tanstack/react-query';
import { cartService } from '../../service/cart.service';
import { cartKeys } from '../cartKeys';
import { tokenService } from '../../../../../../core/auth/token.service';

export const useCartSummaryQuery = () => {
    const hasToken = !!tokenService.getAccessToken();

    return useQuery({
        queryKey: cartKeys.summary(),
        queryFn: async () => {
            const res = await cartService.getCartSummary();
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        enabled: hasToken,
    });
};
