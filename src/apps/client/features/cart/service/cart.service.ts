import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { UpdateCartRequest } from "../dto/UpdateCartRequest.dto";
import type { CartDetailModel } from "../model/cart.model";
import type { CartSummaryModel } from "../model/summary.model";
import type { CartRepo } from "../repo/cart.repo";
import { CartApiRepo } from "../repo/cartApi.repo";
import { CartMockRepo } from "../repo/cartMock.repo";

export class CartService {
    private readonly cartRepo: CartRepo;
    constructor(cartRepo?: CartRepo) {
        this.cartRepo = cartRepo ?? new CartApiRepo();
    }

    /**
     * Get cart count
     */
    async getCartSummary(): Promise<ApiResponse<CartSummaryModel>> {
        return this.cartRepo.getCartSummary();
    }

    /**
     * Get carts and summary
     */
    async getCarts(): Promise<ApiResponse<CartDetailModel>> {
        return this.cartRepo.getCarts();
    }

    /**
     * Add to cart by variantId
     */
    async addToCart(variantId: number, quantity?: number): Promise<ApiResponse<{ newCartCount: number }>> {
        const qty = quantity || 1;
        return this.cartRepo.addToCart(variantId, qty);
    }

    /**
     * Update cart item trực tiếp (gọi API ngay lập tức)
     */
    async updateCartItem(request: UpdateCartRequest[]): Promise<ApiResponse<{ newCartCount: number; totalPrice?: number }>> {
        return this.cartRepo.updateCartItem(request);
    }

    /**
     * Delete item from cart by variantId
     */
    async deleteCartItem(variantId: number): Promise<ApiResponse<{ newCartCount: number; totalPrice?: number }>> {
        return this.cartRepo.deleteCartItem(variantId);
    }
}

export const cartService = new CartService(USE_MOCK ? new CartMockRepo() : new CartApiRepo());