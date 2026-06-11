import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Review } from "../model/review.model";

export interface ReviewRepo {
    getReviewByProductId(productId: number, page: number, pageSize: number): Promise<ApiResponse<Review[]>>;
}