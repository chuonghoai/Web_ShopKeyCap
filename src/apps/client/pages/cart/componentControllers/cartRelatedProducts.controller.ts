import { useState, useEffect } from "react";
import type { ProductItem } from "../../../features/products/model/product.model";

export const useCartRelatedProductsController = (products: ProductItem[]) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setItemsPerView(2);
            else if (window.innerWidth < 1024) setItemsPerView(3);
            else setItemsPerView(4);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(0, products.length - itemsPerView);

    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [maxIndex, currentIndex]);

    const handleNext = () => {
        setCurrentIndex(prev => {
            if (prev >= maxIndex) return 0;
            return Math.min(prev + itemsPerView, maxIndex);
        });
    };

    const handlePrev = () => {
        setCurrentIndex(prev => {
            if (prev <= 0) return maxIndex;
            return Math.max(prev - itemsPerView, 0);
        });
    };

    return {
        currentIndex,
        itemsPerView,
        handleNext,
        handlePrev,
    };
};
