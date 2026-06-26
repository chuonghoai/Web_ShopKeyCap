import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/product.service';
import { productKeys } from '../productKeys';

export const useProductDetailQuery = (slug: string) => {
    return useQuery({
        queryKey: productKeys.detail(slug),
        queryFn: async () => {
            const res = await productService.getProductBySlug(slug);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        enabled: !!slug,
    });
};
