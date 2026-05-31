import { useNavigate } from "react-router-dom";
import { useState, type MouseEvent } from "react";
import type { ProductItem } from "../../../features/products/model/product.model";
import { cartService } from "../../../features/cart/service/cart.service";
import { useCart } from "../../../features/cart/hooks/useCart";
import { useToast } from "../../../../../components/toast/toast";

export const useProductCardController = (data: ProductItem) => {
    const navigate = useNavigate();
    const { syncCartCount } = useCart();
    const { toast } = useToast();
    const [isAdding, setIsAdding] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "₫";
    };


    const handleCardClick = () => {
        navigate(`/product/${data.slug}`);
    };

    const handleAddToCart = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (isAdding) return;

        setIsAdding(true);
        try {
            const productId = Number(data.id);
            const response = await cartService.addToCart(productId);
            if (response.data) {
                syncCartCount(response.data.newCartCount);
            }

            toast("Thêm vào giỏ hàng thành công!", "success");
        } catch (error: any) {
            const errMsg = error.data?.message
                || error.message
                || "Có lỗi xảy ra";
            toast(errMsg, "error");
        } finally {
            setIsAdding(false);
        }
    };

    return {
        isAdding,
        formatPrice,
        handleCardClick,
        handleAddToCart
    };
};