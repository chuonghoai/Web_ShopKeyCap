import { useQuery } from '@tanstack/react-query';
import { reviewService } from '../../services/review.service';
import { reviewKeys } from '../reviewKeys';

export const useProductReviewsQuery = (productId: number, page: number) => {
    return useQuery({
        queryKey: [...reviewKeys.product(productId), page],
        queryFn: async () => {
            const res = await reviewService.getReviewByProductId(productId, page);
            if (!res.success) throw new Error(res.message);
            return {
                reviews: res.data || [],
                pagination: res.pagination || { totalItems: 0, totalPages: 0, page: 1, pageSize: 10 }
            };
        },
        enabled: !!productId,
        placeholderData: (prev) => prev,
    });
};
