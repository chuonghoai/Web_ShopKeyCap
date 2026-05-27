import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { UpdateCartRequest } from "../dto/UpdateCartRequest.dto";
import type { CartSummaryModel } from "../model/summary.model";

export interface CartRepo {
    getCartSummary(): Promise<ApiResponse<CartSummaryModel>>;

    addToCart(productId: number, quantity: number): Promise<ApiResponse<{ newCartCount: number }>>;
    updateCartItem(request: UpdateCartRequest[]): Promise<ApiResponse<{ newCartCount: number }>>;
    deleteCartItem(productId: string): Promise<ApiResponse<{ newCartCount: number }>>;
}