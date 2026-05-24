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
     * Add to cart
     */
    async addToCart(request: UpdateCartRequest) {
        return this.cartRepo.addToCart(request);
    }
}

const useMock = true;
export const cartService = new CartService(useMock ? new CartMockRepo() : undefined);