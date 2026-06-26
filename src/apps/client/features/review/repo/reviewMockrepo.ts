import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Review } from "../model/review.model";
import type { CreateReviewRequest } from "../model/create-review.request";
import type { AvailableReview } from "../model/available-review.model";
import type { ReviewRepo } from "./review.repo";

export class ReviewMockRepo implements ReviewRepo {
    private mockReviews: Review[] = [
        {
            id: 1,
            productId: 1,
            userId: 1,
            user: {
                fullName: "Nguyễn Văn A",
                avatar: "https://png.pngtree.com/png-clipart/20230407/original/pngtree-cute-school-anime-chibi-character-png-image_9035249.png"
            },
            rating: 5,
            content: "Sản phẩm tuyệt vời!",
            createdAt: new Date(),
            imageUrls: ["https://static.vecteezy.com/system/resources/thumbnails/023/009/485/small_2x/abstract-animal-owl-portrait-with-colorful-double-exposure-paint-with-generative-ai-free-photo.jpeg"]
        },
        {
            id: 2,
            productId: 1,
            userId: 2,
            user: {
                fullName: "Nguyễn Văn B",
                avatar: "https://png.pngtree.com/png-clipart/20230407/original/pngtree-cute-school-anime-chibi-character-png-image_9035249.png"
            },
            rating: 4,
            content: "Sản phẩm tốt!",
            createdAt: new Date(),
            imageUrls: ["https://static.vecteezy.com/system/resources/thumbnails/023/009/485/small_2x/abstract-animal-owl-portrait-with-colorful-double-exposure-paint-with-generative-ai-free-photo.jpeg"]
        },
        {
            id: 3,
            productId: 1,
            userId: 3,
            user: {
                fullName: "Nguyễn Văn C",
                avatar: "https://png.pngtree.com/png-clipart/20230407/original/pngtree-cute-school-anime-chibi-character-png-image_9035249.png"
            },
            rating: 3,
            content: "Sản phẩm tạm được!",
            createdAt: new Date(),
            imageUrls: ["https://static.vecteezy.com/system/resources/thumbnails/023/009/485/small_2x/abstract-animal-owl-portrait-with-colorful-double-exposure-paint-with-generative-ai-free-photo.jpeg"]
        }
    ]

    async getReviewByProductId(productId: number, page: number, pageSize: number): Promise<ApiResponse<Review[]>> {
        const mockReview50 = Array.from({ length: pageSize }, (_, index) => {
            const originalItem = this.mockReviews[index % this.mockReviews.length];
            return {
                ...originalItem,
                id: (index + 1),
            };
        });

        const response: ApiResponse<Review[]> = {
            success: true,
            message: `Lấy danh sách đánh giá của ${productId} thành công`,
            data: mockReview50,
            pagination: {
                page: page,
                pageSize: pageSize,
                totalItems: this.mockReviews.length,
                totalPages: 47
            }
        }
        return response;
    }

    async createReview(request: CreateReviewRequest): Promise<ApiResponse<null>> {
        return {
            success: true,
            message: `Tạo đánh giá cho đơn hàng ${request.orderId} thành công`,
            data: null
        }
    }

    async getAvailableReviews(_orderId: number): Promise<ApiResponse<AvailableReview[]>> {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
            success: true,
            message: "Lấy danh sách review thành công",
            data: []
        };
    }
}