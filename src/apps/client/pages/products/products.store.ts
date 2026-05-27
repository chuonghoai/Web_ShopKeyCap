import { useState } from "react";
import type { ProductItem } from "../../features/products/model/product.model";
import { productService } from "../../features/products/services/product.service";
import type { FilterState } from "../../features/products/dto/filterState.dto";
import type { FilterModel } from "../../features/products/model/filter.model";

export const useProductsStore = () => {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [filter, setFilter] = useState<FilterModel>({ category: [], type: [], brand: [] });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchProducts = async (page: number, filterState: FilterState) => {
        setIsLoading(true);
        try {
            const [res, filterRes] = await Promise.all([
                productService.getProduct(page, filterState),
                productService.getFilter(),
            ]);
            if (res.success && res.data) {
                setProducts(res.data);
                if (res.pagination) {
                    setTotalPages(res.pagination.totalPages);
                }
            }
            if (filterRes.success && filterRes.data) {
                setFilter(filterRes.data);
            }
        } catch (error) {
            console.error("Lỗi khi tải danh sách sản phẩm:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        products,
        filter,
        isLoading,
        totalPages,
        fetchProducts,
    };
};