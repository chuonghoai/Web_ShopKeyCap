import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/product.service';
import type { ProductSectionData } from '../../model/productSection.model';
import { productKeys } from '../productKeys';

export const useHomepageSectionsQuery = () => {
    return useQuery<ProductSectionData[]>({
        queryKey: productKeys.homepageSections(),
        queryFn: async () => {
            const results = await Promise.all([
                productService.getNewestProducts(),
                productService.getPopularProducts(),
                productService.getProductsByHotBrand(),
                productService.getGamingProducts(),
                productService.getOfficeProducts(),
                productService.getProductExcludedKeyboard(),
                productService.getCheapestProducts(),
                productService.getExpensiveProducts(),
            ]);

            const validSections = results
                .filter(res => res.success && res.data)
                .map(res => res.data as ProductSectionData);

            return validSections;
        },
    });
};
