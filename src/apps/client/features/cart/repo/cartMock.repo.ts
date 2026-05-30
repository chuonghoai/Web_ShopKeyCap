import type { ApiResponse } from "../../../../../core/api/apiResponse";
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

// Repo
export class CartMockRepo implements CartRepo {
    async getCartSummary(): Promise<ApiResponse<CartSummaryModel>> {
        return ok<CartSummaryModel>(
            { cartCount: totalCount() },
            "Lấy thông tin giỏ hàng thành công"
        );
    }

    async addToCart(productId: number, quantity: number): Promise<ApiResponse<{ newCartCount: number }>> {
        if (quantity <= 0) {
            return fail<null>("Số lượng phải lớn hơn 0");
        }

        const key = String(productId);
        const current = mockItems.get(key) ?? 0;
        mockItems.set(key, current + quantity);

        return ok({ newCartCount: totalCount() }, "Thêm sản phẩm vào giỏ hàng thành công");
    }

    async updateCartItem(request: UpdateCartRequest[]): Promise<ApiResponse<{ newCartCount: number }>> {
        for (const { productId, quantity } of request) {
            if (quantity <= 0) {
                return fail<null>(`Số lượng của sản phẩm ${productId} phải lớn hơn 0`);
            }

            if (!mockItems.has(productId)) {
                return fail<null>(`Sản phẩm ${productId} không tồn tại trong giỏ hàng`);
            }

            mockItems.set(productId, quantity);
        }

        return ok({ newCartCount: totalCount() }, "Cập nhật giỏ hàng thành công");
    }

    async deleteCartItem(productId: string): Promise<ApiResponse<{ newCartCount: number }>> {
        if (!mockItems.has(productId)) {
            return fail<null>(`Sản phẩm ${productId} không tồn tại trong giỏ hàng`);
        }

        mockItems.delete(productId);

        return ok({ newCartCount: totalCount() }, "Xóa sản phẩm khỏi giỏ hàng thành công");
    }
}
