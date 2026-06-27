import { cartService } from "./cart.service";
import type { UpdateCartRequest } from "../dto/UpdateCartRequest.dto";
import { tokenService } from "../../../../../core/auth/token.service";

class CartUpdateDebouncer {
    private static instance: CartUpdateDebouncer;

    private pendingUpdates: Map<number, number> = new Map();
    private syncTimeout: ReturnType<typeof setTimeout> | null = null;
    private readonly DELAY_MS = 500;
    private syncCallback?: (count: number) => void;

    private pendingResolvers: Array<{
        resolve: (val: number) => void;
        reject: (reason?: any) => void;
    }> = [];

    private constructor() {
        this.registerUnloadHandler();
    }

    public static getInstance(): CartUpdateDebouncer {
        if (!CartUpdateDebouncer.instance) {
            CartUpdateDebouncer.instance = new CartUpdateDebouncer();
        }
        return CartUpdateDebouncer.instance;
    }

    /**
     * Mỗi khi bấm +/- số lượng item trong giỏ hàng, 
     * sẽ gọi hàm này, truyền variantId và quantity, 
     * sau 500ms nếu không có thay đổi nào nữa 
     * thì mới gọi API để cập nhật giỏ hàng.
     * Trả về Promise resolve với totalPrice mới nhất.
     */
    public updateCartItem(variantId: number, quantity: number): Promise<number> {
        this.pendingUpdates.set(variantId, quantity);

        if (this.syncTimeout) {
            clearTimeout(this.syncTimeout);
        }

        return new Promise((resolve, reject) => {
            this.pendingResolvers.push({ resolve, reject });

            this.syncTimeout = setTimeout(() => {
                this.syncNow();
            }, this.DELAY_MS);
        });
    }

    /**
     * Sync data cart count
     */
    public async syncNow() {
        if (this.pendingUpdates.size === 0) return;

        const requestPayload: UpdateCartRequest[] = Array.from(this.pendingUpdates.entries()).map(
            ([id, qty]) => ({ variantId: id, quantity: qty })
        );

        this.pendingUpdates.clear();

        const resolversToNotify = [...this.pendingResolvers];
        this.pendingResolvers = [];

        try {
            const response = await cartService.updateCartItem(requestPayload);
            if (this.syncCallback && response.data) {
                this.syncCallback(response.data.newCartCount);
            }
            const totalPrice = response.data?.totalPrice || 0;
            resolversToNotify.forEach(({ resolve }) => resolve(totalPrice));
        } catch (error: any) {
            const errMsg = error.data?.message
                || error.message
                || "Lỗi đồng bộ giỏ hàng";

            resolversToNotify.forEach(({ reject }) => reject(new Error(errMsg)));
        }
    }

    /**
     * Callback function to store (or controller) register function syncCartCount
     * Which use cart debouncer, they need to register this in useEffect
     */
    public registerSyncCallback(cb: (count: number) => void) {
        this.syncCallback = cb;
    }

    private registerUnloadHandler() {
        window.addEventListener('beforeunload', () => {
            if (this.pendingUpdates.size > 0) {
                const requestPayload = Array.from(this.pendingUpdates.entries()).map(
                    ([id, qty]) => ({ variantId: id, quantity: qty })
                );

                const token = tokenService.getAccessToken();

                fetch('/cart/items', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(requestPayload),
                    keepalive: true
                }).catch(err => console.error("Lỗi cứu hộ dữ liệu:", err));
            }
        });
    }
}

export const cartSyncManager = CartUpdateDebouncer.getInstance();