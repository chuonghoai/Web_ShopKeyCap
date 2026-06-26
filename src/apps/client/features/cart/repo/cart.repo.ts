import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { UpdateCartRequest } from "../dto/UpdateCartRequest.dto";
import type { CartSummaryModel } from "../model/summary.model";
import type { CartDetailModel } from "../model/cart.model";

export interface CartRepo {
    getCartSummary(): Promise<ApiResponse<CartSummaryModel>>;
    getCarts(): Promise<ApiResponse<CartDetailModel>>;

    addToCart(variantId: number, quantity: number): Promise<ApiResponse<{ newCartCount: number }>>;
    updateCartItem(request: UpdateCartRequest[]): Promise<ApiResponse<{ newCartCount: number; totalPrice?: number }>>;
    deleteCartItem(variantId: number): Promise<ApiResponse<{ newCartCount: number; totalPrice?: number }>>;
}