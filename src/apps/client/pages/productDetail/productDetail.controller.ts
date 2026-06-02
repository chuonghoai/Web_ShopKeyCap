import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useProductDetailStore } from "./productDetail.store";
import { useCart } from "../../features/cart/hooks/useCart";
import { cartService } from "../../features/cart/service/cart.service";
import { useToast } from "../../../../components/toast/toast";
import {
    getAvailableOptionsWithStatus,
    findMatchingVariant,
    getAttributesFromSku,
    sanitizeSelectedAttributes,
} from "../../features/products/utils/variantSelection.utils";

export const useProductDetailController = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const store = useProductDetailStore();
    const { syncCartCount } = useCart();
    const { toast } = useToast();

    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [quantity, setQuantity] = useState<number>(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    /**
     * Load product detail when init page
     */
    useEffect(() => {
        if (slug) {
            store.fetchProduct(slug);
        }
        return () => store.clearProduct();
    }, [slug]);

    /**
     * Load product's review when init page
     */
    useEffect(() => {
        if (store.product?.id) {
            store.loadReviews(store.product.id, 1);
        }
    }, [store.product?.id]);

    /**
     * Restore selected attributes from URL when init page
     */
    useEffect(() => {
        if (store.product) {
            const skuFromUrl = searchParams.get("sku");
            if (skuFromUrl) {
                const restored = getAttributesFromSku(store.product.variants, skuFromUrl);
                if (restored) {
                    setSelectedAttributes(restored);
                }
            }
        }
    }, [store.product]);

    const currentVariant = useMemo(() => {
        if (!store.product) return null;
        return findMatchingVariant(
            store.product.variants,
            selectedAttributes,
            store.product.options
        );
    }, [selectedAttributes, store.product]);

    const optionsWithStatus = useMemo(() => {
        if (!store.product) return [];
        return getAvailableOptionsWithStatus(
            store.product.variants,
            selectedAttributes,
            store.product.options
        );
    }, [selectedAttributes, store.product]);

    useEffect(() => {
        if (currentVariant) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("sku", currentVariant.sku);
            setSearchParams(newParams, { replace: true });
        }
    }, [currentVariant]);

    // Giá hiển thị khi đã chọn đủ variant
    const displayPrice = currentVariant?.price ?? null;
    const displayOriginalPrice = currentVariant?.originalPrice ?? null;
    const displayPercentDiscount = currentVariant?.percentDiscount ?? null;

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("vi-VN").format(price) + "₫";

    // Khoảng giá hiển thị khi chưa chọn variant (dùng dữ liệu Backend tính sẵn)
    const priceRangeText = (() => {
        if (!store.product) return "";
        const { minPrice, maxPrice } = store.product;
        if (minPrice === maxPrice) return formatPrice(minPrice);
        return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
    })();

    const displayStock = currentVariant
        ? currentVariant.stockQuantity
        : store.product?.totalStockQuantity ?? 0;

    const handleOptionSelect = (optionName: string, value: string) => {
        if (!store.product) return;

        setSelectedAttributes(prev => {
            const updated = { ...prev, [optionName]: value };
            return sanitizeSelectedAttributes(
                store.product!.variants,
                updated,
                store.product!.options
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
        if (!store.product) return;

        const isFullySelected = store.product.options.every(
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

        setIsAddingToCart(true);
        try {
            const response = await cartService.addToCart(currentVariant.id, quantity);

            if (response.data) {
                syncCartCount(response.data.newCartCount);
                toast(`Đã thêm ${quantity} sản phẩm vào giỏ`, "success");
            }
        } catch (error: any) {
            toast(error.message || "Lỗi thêm giỏ hàng", "error");
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleNavigateFilter = (filterKey: string, filterValue: string) => {
        navigate(`/products?${filterKey}=${filterValue}`);
    };

    const handleReviewPageChange = (newPage: number) => {
        if (store.product && newPage >= 1 && newPage <= store.totalPages) {
            store.loadReviews(store.product.id, newPage);
        }
    };

    return {
        product: store.product,
        isLoading: store.isLoading,
        error: store.error,

        selectedAttributes,
        currentVariant,

        optionsWithStatus,

        quantity,
        isAddingToCart,

        displayPrice,
        displayOriginalPrice,
        displayPercentDiscount,
        priceRangeText,
        displayStock,
        formatPrice,

        handleOptionSelect,
        handleQuantityChange,
        handleAddToCart,
        handleNavigateFilter,

        reviewList: store.reviewList,
        reviewCurrentPage: store.currentPage,
        reviewTotalPages: store.totalPages,
        loadingReview: store.loadingReview,
        errorReview: store.errorReview,
        handleReviewPageChange,
    };
};