import { useNavigate } from "react-router-dom";
import type { ProductItem } from "../../../features/products/model/product.model";

export const useProductCardController = (data: ProductItem) => {
    const navigate = useNavigate();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "₫";
    };

    const handleCardClick = () => {
        navigate(`/product/${data.slug}`);
    };

    return {
        formatPrice,
        handleCardClick,
    };
};