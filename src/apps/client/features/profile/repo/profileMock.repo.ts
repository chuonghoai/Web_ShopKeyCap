import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Profile } from "../models/profile.model";
import type { ProfileRepo } from "./profile.repo";
import { ROLE } from "../../../../../core/constants/role.constant";

export class ProfileMockRepo implements ProfileRepo {
    async getProfile(): Promise<ApiResponse<Profile>> {
        return Promise.resolve({
            success: true,
            message: "Success",
            data: {
                id: "mock-123",
                email: "customer@example.com",
                fullName: "Nguyễn Văn Khách",
                avatar: "https://placehold.co/150x150/e2e8f0/64748b?text=User",
                role: ROLE.USER,
                stats: {
                    completedOrders: 10,
                    totalOrders: 12,
                    wishlistItems: 28
                },
                phoneNumber: "0966846513",
                createdAt: new Date(),
            }
        });
    }
}
