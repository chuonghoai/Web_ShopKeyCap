export interface ReviewItemRequest {
    productId: number;
    rating: number;
    content: string;
}

export interface CreateReviewRequest {
    orderId: number;
    reviews: ReviewItemRequest[];
}
