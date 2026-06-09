import type { User } from "./user.model";

export interface ProfileStats {
    totalOrders?: number;
    completedOrders?: number;
    wishlistItems?: number;
}

export interface Profile extends User {
    stats?: ProfileStats;
    phoneNumber?: string;
    createdAt?: string;
}
