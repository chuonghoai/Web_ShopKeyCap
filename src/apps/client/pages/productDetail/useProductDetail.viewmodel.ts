import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useToastStore } from "../../../../core/store/useToastStore";
import { useProductDetailQuery } from "../../features/products/hooks/queries/useProductDetail.query";
import { useProductReviewsQuery } from "../../features/review/hooks/queries/useProductReviews.query";
import { useAddToCartMutation } from "../../features/cart/hooks/mutations/useAddToCart.mutation";
import { useToggleFavoriteMutation } from "../../features/favorite/hooks/mutations/useToggleFavorite.mutation";
import {
    getAvailableOptionsWithStatus,
    findMatchingVariant,
    getAttributesFromSku,
    sanitizeSelectedAttributes,
} from "../../features/products/utils/variantSelection.utils";

export const useProductDetailViewModel = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const toast = useToastStore(state => state.addToast);

    // Form states
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [quantity, setQuantity] = useState<number>(1);
    const [reviewPage, setReviewPage] = useState<number>(1);

    // Queries
    const { data: product, isLoading, error } = useProductDetailQuery(slug || "");
    const productId = product?.id || 0;
    const { data: reviewData, isLoading: loadingReview, error: errorReviewObj } = useProductReviewsQuery(productId, reviewPage);

    // Mutations
    const addToCartMutation = useAddToCartMutation();
    const toggleFavoriteMutation = useToggleFavoriteMutation();

    /**
     * Restore selected attributes from URL when product loads
     */
    useEffect(() => {
        if (product) {
            const skuFromUrl = searchParams.get("sku");
            if (skuFromUrl) {
                const restored = getAttributesFromSku(product.variants, skuFromUrl);
                if (restored) {
                    setSelectedAttributes(restored);
                }
            }
        }
    }, [product]);

    const currentVariant = useMemo(() => {
        if (!product) return null;
        return findMatchingVariant(
            product.variants,
            selectedAttributes,
            product.options
        );
    }, [selectedAttributes, product]);

    const optionsWithStatus = useMemo(() => {
        if (!product) return [];
        return getAvailableOptionsWithStatus(
            product.variants,
            selectedAttributes,
            product.options
        );
    }, [selectedAttributes, product]);

    useEffect(() => {
        if (currentVariant) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("sku", currentVariant.sku);
            setSearchParams(newParams, { replace: true });
        }
    }, [currentVariant]);

    const displayPrice = currentVariant?.price ?? null;
    const displayOriginalPrice = currentVariant?.originalPrice ?? null;
    const displayPercentDiscount = currentVariant?.percentDiscount ?? null;

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("vi-VN").format(price) + "₫";

    const priceRangeText = (() => {
        if (!product) return "";
        const { minPrice, maxPrice } = product;
        if (minPrice === maxPrice) return formatPrice(minPrice);
        return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
    })();

    const displayStock = currentVariant
        ? currentVariant.stockQuantity
        : product?.totalStockQuantity ?? 0;

    const handleOptionSelect = (optionName: string, value: string) => {
        if (!product) return;

        setSelectedAttributes(prev => {
            const updated = { ...prev, [optionName]: value };
            return sanitizeSelectedAttributes(
                product.variants,
                updated,
                product.options
            );
        });
        setQuantity(1);
    };

    const handleQuantityChange = (type: "increase" | "decrease") => {
        if (type === "increase" && quantity < displayStock) {
            setQuantity(prev => prev + 1);
        } else if (type === "decrease" && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = async () => {
        if (!product) return;

        const isFullySelected = product.options.every(
            opt => selectedAttributes[opt.name] !== undefined
        );
        if (!isFullySelected) {
            toast("Vui lòng chọn đầy đủ phân loại sản phẩm", "warning");
            return;
        }

        if (!currentVariant || currentVariant.stockQuantity < 1) {
            toast("Sản phẩm này hiện đang hết hàng", "error");
            return;
        }

        try {
            await addToCartMutation.mutateAsync({
                variantId: currentVariant.id,
                quantity
            });
            toast(`Đã thêm ${quantity} sản phẩm vào giỏ`, "success");
        } catch (err: any) {
            toast(err.message || "Lỗi thêm giỏ hàng", "error");
        }
    };

    const handleBuyNow = () => {
        if (!product) return;

        const isFullySelected = product.options.every(
            opt => selectedAttributes[opt.name] !== undefined
        );
        if (!isFullySelected) {
            toast("Vui lòng chọn đầy đủ phân loại sản phẩm", "warning");
            return;
        }

        if (!currentVariant || currentVariant.stockQuantity < 1) {
            toast("Sản phẩm này hiện đang hết hàng", "error");
            return;
        }

        navigate("/checkout", {
            state: {
                items: [{ variantId: currentVariant.id, quantity }],
                cartItemIds: []
            }
        });
    };

    const handleNavigateFilter = (filterKey: string, filterValue: string) => {
        navigate(`/products?${filterKey}=${filterValue}`);
    };

    const handleReviewPageChange = (newPage: number) => {
        if (product && newPage >= 1 && newPage <= (reviewData?.pagination.totalPages || 1)) {
            setReviewPage(newPage);
        }
    };

    const handleToggleFavorite = async () => {
        if (!product) return;
        try {
            await toggleFavoriteMutation.mutateAsync(product.id);
        } catch (err: any) {
            toast(err.message || "Không thể cập nhật danh sách yêu thích", "error");
        }
    };

    return {
        product,
        isLoading,
        error: error ? (error as Error).message : null,

        selectedAttributes,
        currentVariant,

        optionsWithStatus,

        quantity,
        isAddingToCart: addToCartMutation.isPending,

        displayPrice,
        displayOriginalPrice,
        displayPercentDiscount,
        priceRangeText,
        displayStock,
        formatPrice,

        handleOptionSelect,
        handleQuantityChange,
        handleAddToCart,
        handleBuyNow,
        handleNavigateFilter,

        handleToggleFavorite,

        reviewList: reviewData?.reviews || [],
        reviewCurrentPage: reviewData?.pagination.page || 1,
        reviewTotalPages: reviewData?.pagination.totalPages || 1,
        loadingReview,
        errorReview: errorReviewObj ? (errorReviewObj as Error).message : null,
        handleReviewPageChange,
    };
};
