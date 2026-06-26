import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useOrderDetailQuery } from "../../../features/order/hooks/queries/useOrderDetail.query";
import { useAvailableReviews, useCreateReview } from "../../../features/review";

export const useOrderReviewsController = () => {
    const { id } = useParams<{ id: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const orderId = Number(id);

    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    // Fetch order details
    const { 
        data: orderData, 
        isLoading: isOrderLoading, 
        isError: isOrderError 
    } = useOrderDetailQuery(orderId);

    // Fetch available reviews
    const { 
        data: reviewsData, 
        isLoading: isReviewsLoading,
        refetch: refetchReviews
    } = useAvailableReviews(orderId);

    // Create review mutation
    const createReviewMutation = useCreateReview();

    const order = orderData;
    const availableReviews = reviewsData?.data || [];

    // Initialize selected product from query param or first item
    useEffect(() => {
        if (order?.items && order.items.length > 0) {
            const productIdFromUrl = searchParams.get("productId");
            if (productIdFromUrl) {
                const found = order.items.find(item => item.productId === Number(productIdFromUrl));
                if (found) {
                    setSelectedProductId(found.productId);
                    return;
                }
            }
            if (!selectedProductId) {
                setSelectedProductId(order.items[0].productId);
            }
        }
    }, [order, searchParams, selectedProductId]);

    // Update URL when selected product changes
    const handleSelectProduct = (productId: number) => {
        setSelectedProductId(productId);
        setSearchParams({ productId: productId.toString() });
    };

    return {
        orderId,
        order,
        availableReviews,
        selectedProductId,
        handleSelectProduct,
        isLoading: isOrderLoading || isReviewsLoading,
        isError: isOrderError || !order,
        createReviewMutation,
        refetchReviews
    };
};
