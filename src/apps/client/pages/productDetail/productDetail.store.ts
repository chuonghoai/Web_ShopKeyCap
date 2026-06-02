import { useState } from "react";
import type { ProductDetail } from "../../features/products/model/productDetail.model";
import { productService } from "../../features/products/services/product.service";
import type { Review } from "../../features/review/model/review.model";
import { reviewService } from "../../features/review/services/review.service";

export const useProductDetailStore = () => {
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [reviewList, setReviewList] = useState<Review[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loadingReview, setLoadingReview] = useState<boolean>(false);
    const [errorReview, setErrorReview] = useState<string | null>(null);

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

    const setProductFavorite = (isFavorite: boolean) => {
        setProduct(prev => prev ? { ...prev, isFavorite } : null);
    };

    const loadReviews = async (productId: string, page: number) => {
        setLoadingReview(true);
        setErrorReview(null);
        try {
            const res = await reviewService.getReviewByProductId(productId, page);
            if (res && res.success && res.data) {
                setReviewList(res.data || []);
                setCurrentPage(res.pagination?.page || 1);
                setPageSize(res.pagination?.pageSize || 10);
                setTotalElements(res.pagination?.totalItems || 0);
                setTotalPages(res.pagination?.totalPages || 0);
            } else {
                setErrorReview(res?.message || "Không thể tải đánh giá");
            }
        } catch (err: any) {
            setErrorReview(err.message || "Lỗi khi tải dữ liệu đánh giá");
        } finally {
            setLoadingReview(false);
        }
    };

    return {
        product,
        isLoading,
        error,

        fetchProduct,
        clearProduct,
        setProductFavorite,

        reviewList,
        currentPage,
        pageSize,
        totalElements,
        totalPages,

        loadingReview,
        errorReview,
        loadReviews,
    };
};