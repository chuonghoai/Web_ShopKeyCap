import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Review } from "../model/review.model";
import type { CreateReviewRequest } from "../model/create-review.request";
import type { AvailableReview } from "../model/available-review.model";
import type { ReviewRepo } from "./review.repo";

export class ReviewApiRepo implements ReviewRepo {
    /**
     * GET /reviews
     * @param - productId, page, pageSize
     * @returns Review[] with pagination
     */
    async getReviewByProductId(productId: number, page: number, pageSize: number): Promise<ApiResponse<Review[]>> {
        return apiClient.get("/reviews", {
            params: {
                productId, page, pageSize
            }
        });
    }

    /**
     * POST /reviews
     * @param request CreateReviewRequest
     * @returns Success response
     */
    async createReview(request: CreateReviewRequest): Promise<ApiResponse<null>> {
        return apiClient.post("/reviews", request);
    }

    /**
     * GET /reviews/available
     * @param orderId 
     * @returns Array of existing reviews for the order
     */
    async getAvailableReviews(orderId: number): Promise<ApiResponse<AvailableReview[]>> {
        return apiClient.get("/reviews/available", {
            params: { orderId }
        });
    }
}