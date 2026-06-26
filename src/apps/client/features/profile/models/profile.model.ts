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

export interface UpdateProfileDto {
    fullName: string;
    phone: string;
    avatarMediaId?: number;     // Đây là id của record đã được lưu trong bảng medias
    avatar_url?: string;        //  Đây là secure_url gửi kèm, backend có thể phớt lờ hoặc so sánh với medias để kiểm tra hợp lệ
}
