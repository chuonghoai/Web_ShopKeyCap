import { useEffect } from "react";
import { useProductDetailStore } from "./productDetail.store";

export const useReviewSectionController = (productId: string) => {
    const store = useProductDetailStore();

    useEffect(() => {
        if (productId) {
            store.loadReviews(productId, 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= store.totalPages) {
            store.loadReviews(productId, newPage);
        }
    };

    return {
        ...store,
        handlePageChange,
    };
};
