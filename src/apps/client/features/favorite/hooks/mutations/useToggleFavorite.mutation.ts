import { useMutation, useQueryClient } from '@tanstack/react-query';
import { favoriteService } from '../../services/favorite.service';
import { productKeys } from '../../../products/hooks/productKeys';

export const useToggleFavoriteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (productId: number) => {
            const res = await favoriteService.toggleFavorite(productId);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        onSuccess: () => {
            // Invalidate product details and favorite list
            queryClient.invalidateQueries({ queryKey: productKeys.all });
        },
    });
};
