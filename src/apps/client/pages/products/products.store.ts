import { useState } from "react";
import type { ProductItem } from "../../features/products/model/product.model";
import { productService } from "../../features/products/services/product.service";
import type { FilterState } from "../../features/products/dto/filterState.dto";

export const useProductsStore = () => {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchProducts = async (page: number, filterState: FilterState) => {
        setIsLoading(true);
        try {
            const res = await productService.getProduct(page, filterState);
            if (res.success && res.data) {
                setProducts(res.data);
                if (res.pagination) {
                    setTotalPages(res.pagination.totalPages);
                }
            }
        } catch (error) {
            console.error("Lỗi khi tải danh sách sản phẩm:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        products,
        isLoading,
        totalPages,
        fetchProducts,
    };
};