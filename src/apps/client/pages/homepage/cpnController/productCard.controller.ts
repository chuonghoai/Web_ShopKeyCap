import { useNavigate } from "react-router-dom";
import type { MouseEvent } from "react";
import type { ProductItem } from "../../../features/products/model/product.model";

export const useProductCardController = (data: ProductItem) => {
    const navigate = useNavigate();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "₫";
    };

    let discountText = "";
    if (data.percentDiscount > 0) {
        discountText = `-${data.percentDiscount}%`;
    } else if (data.originalPrice > data.price) {
        discountText = `-${formatPrice(data.originalPrice - data.price)}`;
    }

    const handleCardClick = () => {
        navigate(`/product/${data.slug}`);
    };

    const handleActionClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    };

    return {
        formatPrice,
        discountText,
        handleCardClick,
        handleActionClick
    };
};