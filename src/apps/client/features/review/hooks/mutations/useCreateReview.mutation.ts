import { useMutation } from "@tanstack/react-query";
import type { CreateReviewRequest } from "../../model/create-review.request";
import { reviewService } from "../../services/review.service";
import type { ApiResponse } from "../../../../../../core/api/apiResponse";

export const useCreateReview = () => {
    return useMutation<ApiResponse<null>, Error, CreateReviewRequest>({
        mutationFn: (request: CreateReviewRequest) => reviewService.createReview(request),
    });
};
