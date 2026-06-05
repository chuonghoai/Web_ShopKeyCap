import { useQuery } from '@tanstack/react-query';
import { cartKeys } from './cartKeys';
import type { CartDetailModel } from '../model/cart.model';
import { tokenService } from '../../../../../core/auth/token.service';
export const useCartCount = () => {
    const hasToken = !!tokenService.getAccessToken();
    
    const { data: cartData } = useQuery<CartDetailModel>({
        queryKey: cartKeys.items(),
        enabled: hasToken,
    });

    if (!hasToken) return 0;
    
    return cartData?.summary.cartCount || 0;
};
