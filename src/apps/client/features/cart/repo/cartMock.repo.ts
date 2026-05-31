import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { ApiException } from "../../../../../core/exceptions/api.exception";
import type { UpdateCartRequest } from "../dto/UpdateCartRequest.dto";
import type { CartSummaryModel } from "../model/summary.model";
import type { CartRepo } from "./cart.repo";

// Mock database
const mockItems: Map<string, number> = new Map([
    ["1", 2],
    ["2", 1],
    ["3", 5],
    ["4", 3],
]);

const totalCount = () =>
    Array.from(mockItems.values()).reduce((sum, q) => sum + q, 0);

// Helper response builders
const ok = <T>(data: T, message: string): ApiResponse<T> => ({
    success: true,
    message,
    data,
});

const fail = <T>(message: string): ApiResponse<T> => ({
    success: false,
    message,
    data: undefined as T,
});

const LOGGED_IN = true;

// Repo
export class CartMockRepo implements CartRepo {
    async getCartSummary(): Promise<ApiResponse<CartSummaryModel>> {
        return ok<CartSummaryModel>(
            { cartCount: totalCount() },
            "Lấy thông tin giỏ hàng thành công"
        );
    }

    async addToCart(variantId: string, quantity: number): Promise<ApiResponse<{ newCartCount: number }>> {
        if (LOGGED_IN) {
            if (quantity <= 0) {
                return fail<null>("Số lượng phải lớn hơn 0");
            }

            const current = mockItems.get(variantId) ?? 0;
            mockItems.set(variantId, current + quantity);

            return ok({ newCartCount: totalCount() }, "Thêm sản phẩm vào giỏ hàng thành công");
        }
        throw new ApiException("Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng", 401);
    }

    async updateCartItem(request: UpdateCartRequest[]): Promise<ApiResponse<{ newCartCount: number }>> {
        if (LOGGED_IN) {
            for (const { variantId, quantity } of request) {
                if (quantity <= 0) {
                    return fail<null>(`Số lượng của variant ${variantId} phải lớn hơn 0`);
                }

                if (!mockItems.has(variantId)) {
                    return fail<null>(`Variant ${variantId} không tồn tại trong giỏ hàng`);
                }

                mockItems.set(variantId, quantity);
            }

            return ok({ newCartCount: totalCount() }, "Cập nhật giỏ hàng thành công");
        }
        throw new ApiException("Bạn phải đăng nhập để cập nhật giỏ hàng", 401);
    }

    async deleteCartItem(variantId: string): Promise<ApiResponse<{ newCartCount: number }>> {
        if (LOGGED_IN) {
            if (!mockItems.has(variantId)) {
                return fail<null>(`Variant ${variantId} không tồn tại trong giỏ hàng`);
            }

            mockItems.delete(variantId);

            return ok({ newCartCount: totalCount() }, "Xóa sản phẩm khỏi giỏ hàng thành công");
        }
        throw new ApiException("Bạn phải đăng nhập để cập nhật giỏ hàng", 401);
    }
}
