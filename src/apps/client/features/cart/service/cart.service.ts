import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { UpdateCartRequest } from "../dto/UpdateCartRequest.dto";
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
    async getCartSummary() {
        return this.cartRepo.getCartSummary();
    }

    /**
     * Add to cart by variantId
     */
    async addToCart(variantId: string, quantity?: number) {
        const qty = quantity || 1;
        return this.cartRepo.addToCart(variantId, qty);
    }

    /**
     * Update cart item trực tiếp (gọi API ngay lập tức)
     */
    async updateCartItem(request: UpdateCartRequest[]) {
        return this.cartRepo.updateCartItem(request);
    }

    /**
     * Delete item from cart
     */
    async deleteCartItem(productId: string) {
        return this.cartRepo.deleteCartItem(productId);
    }
}

export const cartService = new CartService(USE_MOCK ? new CartMockRepo() : new CartApiRepo());