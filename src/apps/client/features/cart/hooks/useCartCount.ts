import { tokenService } from '../../../../../core/auth/token.service';
import { useCartSummaryQuery } from './queries/useCartSummary.query';

export const useCartCount = () => {
    const hasToken = !!tokenService.getAccessToken();
    
    const { data: summaryData } = useCartSummaryQuery();

    if (!hasToken) return 0;
    
    return summaryData?.cartCount || 0;
};
