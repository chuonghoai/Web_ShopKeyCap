import type { User } from "../../profile/models/user.model";

export interface Review {
    id: number;
    productId: number;
    userId: number;
    user: {
        fullName: User['fullName'];
        avatar: User['avatar'];
    };
    rating: number;
    content: string;
    createdAt: Date;

    /**
     * Ảnh đính kèm
     */
    imageUrls?: string[];
}