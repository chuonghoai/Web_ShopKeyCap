import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { ERole } from "../../../../../core/constants/role.constant";
import type { Profile, UpdateProfileDto } from "../models/profile.model";
import type { ProfileRepo } from "./profile.repo";

export class ProfileMockRepo implements ProfileRepo {
    async getProfile(): Promise<ApiResponse<Profile>> {
        return Promise.resolve({
            success: true,
            message: "Success",
            data: {
                id: 123,
                email: "customer@example.com",
                fullName: "Nguyễn Văn Khách",
                avatar: "https://placehold.co/150x150/e2e8f0/64748b?text=User",
                role: ERole.USER,
                stats: {
                    completedOrders: 10,
                    totalOrders: 12,
                    wishlistItems: 28
                },
                phoneNumber: "0966846513",
                createdAt: new Date().toDateString(),
            }
        });
    }

    async updateProfile(data: UpdateProfileDto): Promise<ApiResponse<Profile>> {
        return Promise.resolve({
            success: true,
            message: "Cập nhật thành công",
            data: {
                id: 123,
                email: "customer@example.com",
                fullName: data.fullName,
                avatar: data.avatar_url || "https://placehold.co/150x150/e2e8f0/64748b?text=User",
                role: ERole.USER,
                stats: {
                    completedOrders: 10,
                    totalOrders: 12,
                    wishlistItems: 28
                },
                phoneNumber: data.phone,
                createdAt: new Date().toDateString(),
            }
        });
    }
}
