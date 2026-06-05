import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/product.service';
import type { FilterState } from '../../dto/filterState.dto';
import { productKeys } from '../productKeys';

export const useProductsQuery = (page: number, filterState: FilterState) => {
    return useQuery({
        queryKey: productKeys.list(page, filterState),
        queryFn: async () => {
            const res = await productService.getProduct(page, filterState);
            if (!res.success) throw new Error(res.message);
            return {
                products: res.data || [],
                pagination: res.pagination || { totalPages: 1, totalItems: 0, currentPage: 1, pageSize: 12 },
            };
        },
        placeholderData: (previousData) => previousData, // keep previous data while fetching new page
    });
};
