import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { UpdateCartRequest } from "../../dto/UpdateCartRequest.dto";
import type { CartSummaryModel } from "../model/summary.model";
import type { CartRepo } from "./cart.repo";

interface MockDb {
    cartCount: number;
}

const mockDb: MockDb = {
    cartCount: 24,
};

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

export class CartMockRepo implements CartRepo {
    async getCartSummary(): Promise<ApiResponse<CartSummaryModel>> {
        return ok<CartSummaryModel>(
            { cartCount: mockDb.cartCount },
            "Lấy thông tin giỏ hàng thành công"
        );
    }

    async addToCart(request: UpdateCartRequest): Promise<ApiResponse<null>> {
        const { quantity } = request;

        if (quantity <= 0) {
            return fail<null>("Số lượng phải lớn hơn 0");
        }

        mockDb.cartCount += quantity;

        return ok(null, "Thêm sản phẩm vào giỏ hàng thành công");
    }
}
