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
    const [mainImage, setMainImage] = useState<string>("");

    useEffect(() => {
        if (slug) {
            store.fetchProduct(slug);
        }
        return () => store.clearProduct();
    }, [slug]);

    useEffect(() => {
        if (store.product) {
            setMainImage(store.product.imageUrl);
            const skuFromUrl = searchParams.get("sku");
            if (skuFromUrl) {
                const restored = getAttributesFromSku(store.product.variants, skuFromUrl);
                if (restored) {
                    const variant = store.product.variants.find(v => v.sku === skuFromUrl);
                    setSelectedAttributes(restored);
                    if (variant?.imageUrl) setMainImage(variant.imageUrl);
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

    const displayPrice = currentVariant
        ? currentVariant.price
        : store.product?.variants[0]?.price ?? 0;

    const displayOriginalPrice = currentVariant
        ? currentVariant.originalPrice
        : store.product?.variants[0]?.originalPrice ?? 0;

    const displayStock = currentVariant
        ? currentVariant.stockQuantity
        : store.product?.totalStockQuantity ?? 0;

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("vi-VN").format(price) + "₫";

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
            // Lưu ý: Trong thực tế sẽ gửi currentVariant.id thay vì product.id
            // Nhưng do API mock hiện tại hàm addToCart nhận productId kiểu number,
            // cần đồng bộ lại kiểu dữ liệu ID giữa cartService và productVariant sau.
            // Tạm thời truyền tạm id của sản phẩm gốc để mock chạy.
            const response = await cartService.addToCart(Number(store.product.id), quantity);

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

    return {
        product: store.product,
        isLoading: store.isLoading,
        error: store.error,

        mainImage,
        setMainImage,
        selectedAttributes,
        currentVariant,

        optionsWithStatus,

        quantity,
        isAddingToCart,

        displayPrice,
        displayOriginalPrice,
        displayStock,
        formatPrice,

        handleOptionSelect,
        handleQuantityChange,
        handleAddToCart,
        handleNavigateFilter,
    };
};