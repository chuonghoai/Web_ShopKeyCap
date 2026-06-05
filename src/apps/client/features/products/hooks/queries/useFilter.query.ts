import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/product.service';
import { productKeys } from '../productKeys';

export const useFilterQuery = () => {
    return useQuery({
        queryKey: productKeys.filters(),
        queryFn: async () => {
            const res = await productService.getFilter();
            if (!res.success) throw new Error(res.message);
            return res.data || { category: [], type: [], brand: [] };
        },
        staleTime: Infinity, // Filters rarely change
    });
};
