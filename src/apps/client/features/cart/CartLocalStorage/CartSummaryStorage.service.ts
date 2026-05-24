import { localStorageService } from "../../../../../core/localStorage/localStorage.service";

const CART_SUMMARY_KEY = "cart_summary";

class CartSummaryStorageService {
    save(cartCount: number): void {
        localStorageService.set(CART_SUMMARY_KEY, cartCount);
    }

    get(): number {
        return localStorageService.get<number>(CART_SUMMARY_KEY);
    }

    clear(): void {
        localStorageService.remove(CART_SUMMARY_KEY);
    }
}

export const cartSummaryStorageService = new CartSummaryStorageService();