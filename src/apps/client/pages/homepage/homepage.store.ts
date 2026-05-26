import { useEffect, useState } from "react";
import type { ProductSectionData } from "../../features/products/model/productSection.model";
import { productService } from "../../features/products/services/product.service";

export const useHomepageStore = () => {
    const [sections, setSections] = useState<ProductSectionData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchAllProducts = async () => {
        setIsLoading(true);
        try {
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

            setSections(validSections);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu trang chủ:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    return {
        isLoading,
        sections,
        refreshData: fetchAllProducts,
    };
};