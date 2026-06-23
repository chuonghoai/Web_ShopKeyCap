import { useQuery } from "@tanstack/react-query";
import { reviewService } from "../../services/review.service";
import { reviewKeys } from "../reviewKeys";

export const useAvailableReviews = (orderId: number) => {
    return useQuery({
        queryKey: reviewKeys.available(orderId),
        queryFn: () => reviewService.getAvailableReviews(orderId),
        enabled: !!orderId,
    });
};
