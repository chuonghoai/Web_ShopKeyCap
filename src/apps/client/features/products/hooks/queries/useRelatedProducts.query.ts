import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/product.service';
import { productKeys } from '../productKeys';

export const useRelatedProductsQuery = (productIds: number[]) => {
    return useQuery({
        queryKey: productKeys.related(productIds),
        queryFn: async () => {
            const res = await productService.getRelatedProducts(productIds);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        enabled: productIds.length > 0,
    });
};
