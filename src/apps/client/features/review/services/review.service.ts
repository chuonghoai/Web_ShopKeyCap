import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { Review } from "../model/review.model";
import type { CreateReviewRequest } from "../model/create-review.request";
import type { ReviewRepo } from "../repo/review.repo";
import { ReviewApiRepo } from "../repo/reviewApi.repo";
import { ReviewMockRepo } from "../repo/reviewMockrepo";

const PAGE_SIZE = 5;

export class ReviewService {
    private readonly reviewRepo: ReviewRepo;

    constructor(reviewRepo?: ReviewRepo) {
        this.reviewRepo = reviewRepo ?? new ReviewApiRepo();
    }

    async getReviewByProductId(productId: number, currentPage: number): Promise<ApiResponse<Review[]>> {
        return this.reviewRepo.getReviewByProductId(productId, currentPage, PAGE_SIZE);
    }

    async createReview(request: CreateReviewRequest): Promise<ApiResponse<null>> {
        return this.reviewRepo.createReview(request);
    }
}

export const reviewService = new ReviewService(USE_MOCK ? new ReviewMockRepo() : undefined)