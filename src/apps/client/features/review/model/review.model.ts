import type { User } from "../../profile/models/user.model";

export interface Review {
    id: string;
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