import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { UpdateCartRequest } from "../dto/UpdateCartRequest.dto";
import type { CartSummaryModel } from "../model/summary.model";
import type { CartDetailModel } from "../model/cart.model";
import type { CartRepo } from "./cart.repo";

export class CartApiRepo implements CartRepo {
    /**
     * GET /cart/summary
     * @returns CartSummaryModel 
     * 
     * Mô tả: Lấy tổng số toàn bộ sản phẩm trong giỏ hàng của người dùng
     */
    async getCartSummary(): Promise<ApiResponse<CartSummaryModel>> {
        return apiClient.get<ApiResponse<CartSummaryModel>>("/cart/summary");
    }

    /**
     * GET /cart
     * @returns CartDetailModel
     */
    async getCarts(): Promise<ApiResponse<CartDetailModel>> {
        return apiClient.get<ApiResponse<CartDetailModel>>("/cart");
    }

    /**
     * POST /cart/items
     * @body variantId, quantity
     * @returns newCartCount
     * 
     * Mô tả: 
     *  - Thêm sản phẩm vào giỏ hàng theo variantId
     *  - Nếu variant đã tồn tại, cộng dồn số lượng (không tạo mới)
     */
    async addToCart(variantId: number, quantity: number): Promise<ApiResponse<{ newCartCount: number }>> {
        return apiClient.post<ApiResponse<{ newCartCount: number }>>("/cart/items", {
            variantId, quantity
        });
    }

    /**
     * PATCH /cart/items
     * @body UpdateCartRequest[]
     * @returns newCartCount, totalPrice
     * 
     * Mô tả: Cập nhật số lượng sản phẩm trong giỏ hàng
     */
    updateCartItem(request: UpdateCartRequest[]): Promise<ApiResponse<{ newCartCount: number; totalPrice?: number }>> {
        return apiClient.patch<ApiResponse<{ newCartCount: number; totalPrice?: number }>>("/cart/items", request);
    }

    /**
     * DELETE /cart/items/{variantId}
     * @param variantId
     * @returns newCartCount, totalPrice
     * 
     * Mô tả: Xóa variant khỏi giỏ hàng
     */
    deleteCartItem(variantId: number): Promise<ApiResponse<{ newCartCount: number; totalPrice?: number }>> {
        return apiClient.delete<ApiResponse<{ newCartCount: number; totalPrice?: number }>>(`/cart/items/${variantId}`);
    }
}