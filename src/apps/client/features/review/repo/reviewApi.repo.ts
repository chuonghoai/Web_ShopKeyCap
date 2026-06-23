import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Review } from "../model/review.model";
import type { CreateReviewRequest } from "../model/create-review.request";
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
}