import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Review } from "../model/review.model";
import type { ReviewRepo } from "./review.repo";

export class ReviewMockRepo implements ReviewRepo {
    private mockReviews: Review[] = [
        {
            id: "1",
            user: {
                fullName: "Nguyễn Văn A",
                avatar: "https://example.com/avatar.jpg"
            },
            rating: 5,
            content: "Sản phẩm tuyệt vời!",
            createdAt: new Date(),
            imageUrls: ["https://example.com/image.jpg"]
        },
        {
            id: "2",
            user: {
                fullName: "Nguyễn Văn B",
                avatar: "https://example.com/avatar.jpg"
            },
            rating: 4,
            content: "Sản phẩm tốt!",
            createdAt: new Date(),
            imageUrls: ["https://example.com/image.jpg"]
        },
        {
            id: "3",
            user: {
                fullName: "Nguyễn Văn C",
                avatar: "https://example.com/avatar.jpg"
            },
            rating: 3,
            content: "Sản phẩm tạm được!",
            createdAt: new Date(),
            imageUrls: ["https://example.com/image.jpg"]
        }
    ]

    async getReviewByProductId(productId: string, page: number, pageSize: number): Promise<ApiResponse<Review[]>> {
        const response: ApiResponse<Review[]> = {
            success: true,
            message: `Lấy danh sách đánh giá của ${productId} thành công`,
            data: this.mockReviews,
            pagination: {
                page: page,
                pageSize: pageSize,
                totalItems: this.mockReviews.length,
                totalPages: Math.ceil(this.mockReviews.length / pageSize)
            }
        }
        return response;
    }
}