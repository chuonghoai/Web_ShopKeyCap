import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Review } from "../model/review.model";

import type { CreateReviewRequest } from "../model/create-review.request";

export interface ReviewRepo {
    getReviewByProductId(productId: number, page: number, pageSize: number): Promise<ApiResponse<Review[]>>;
    createReview(request: CreateReviewRequest): Promise<ApiResponse<null>>;
}