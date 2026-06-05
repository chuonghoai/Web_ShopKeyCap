import { useQuery } from '@tanstack/react-query';
import { cartKeys } from './cartKeys';
import type { CartDetailModel } from '../model/cart.model';
import { cartSummaryStorageService } from '../CartLocalStorage/CartSummaryStorage.service';
import { tokenService } from '../../../../../core/auth/token.service';

export const useCartCount = () => {
    const hasToken = tokenService.getAccessToken();
    
    const { data: cartData } = useQuery<CartDetailModel>({
        queryKey: cartKeys.items(),
        enabled: false,
    });

    if (!hasToken) return 0;
    
    if (cartData) {
        return cartData.summary.cartCount;
    }

    return cartSummaryStorageService.get() || 0;
};
