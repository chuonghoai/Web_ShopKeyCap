import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { ReviewRepo } from "../repo/review.repo";
import { ReviewApiRepo } from "../repo/reviewApi.repo";
import { ReviewMockRepo } from "../repo/reviewMockrepo";

const PAGE_SIZE = 10;

export class ReviewService {
    private readonly reviewRepo: ReviewRepo;

    constructor(reviewRepo?: ReviewRepo) {
        this.reviewRepo = reviewRepo ?? new ReviewApiRepo();
    }

    async getReviewByProductId(productId: string, currentPage: number) {
        return this.reviewRepo.getReviewByProductId(productId, currentPage, PAGE_SIZE);
    }
}

export const reviewService = new ReviewService(USE_MOCK ? new ReviewMockRepo() : undefined)