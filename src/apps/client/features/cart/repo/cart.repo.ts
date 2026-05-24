import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { UpdateCartRequest } from "../../dto/UpdateCartRequest.dto";
import type { CartSummaryModel } from "../model/summary.model";

export interface CartRepo {
    getCartSummary(): Promise<ApiResponse<CartSummaryModel>>;

    addToCart(request: UpdateCartRequest): Promise<ApiResponse<null>>;
    // updateCartItem(id: string, quantity: number): Promise<ApiResponse<null>>;
    // deleteCartItem(id: string): Promise<ApiResponse<null>>;
}