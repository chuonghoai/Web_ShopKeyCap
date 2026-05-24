import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { UpdateCartRequest } from "../../dto/UpdateCartRequest.dto";
import type { CartSummaryModel } from "../model/summary.model";
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
     * POST /cart/items
     * @body UpdateCartRequest
     * @returns null
     * 
     * Mô tả: 
     *  - Thêm sản phẩm vào giỏ hàng
     *  - Nếu sản phẩm đã tồn tại, cộng dồn số lượng (ko tạo mới)
     */
    async addToCart(request: UpdateCartRequest): Promise<ApiResponse<null>> {
        return apiClient.post<ApiResponse<null>>("/cart/items", request);
    }
}