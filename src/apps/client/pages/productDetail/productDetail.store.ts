import { useState } from "react";
import type { ProductDetail } from "../../features/products/model/productDetail.model";
import { productService } from "../../features/products/services/product.service";

export const useProductDetailStore = () => {
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = async (slug: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await productService.getProductBySlug(slug);
            if (res.success && res.data) {
                setProduct(res.data);
            } else {
                setError(res.message || "Không tìm thấy sản phẩm");
            }
        } catch (err: any) {
            setError(err.message || "Lỗi khi tải dữ liệu sản phẩm");
        } finally {
            setIsLoading(false);
        }
    };

    const clearProduct = () => {
        setProduct(null);
    }

    return {
        product,
        isLoading,
        error,
        fetchProduct,
        clearProduct
    };
};