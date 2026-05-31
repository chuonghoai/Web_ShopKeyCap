import { cartService } from "./cart.service";
import type { UpdateCartRequest } from "../dto/UpdateCartRequest.dto";
import { tokenService } from "../../../../../core/auth/token.service";

class CartUpdateDebouncer {
    private pendingUpdates: Map<string, number> = new Map();
    private syncTimeout: ReturnType<typeof setTimeout> | null = null;
    private readonly DELAY_MS = 500;
    private syncCallback?: (count: number) => void;

    constructor() {
        this.registerUnloadHandler();
    }

    /**
     * Mỗi khi bấm +/- số lượng item trong giỏ hàng, 
     * sẽ gọi hàm này, truyền variantId và quantity, 
     * sau 500ms nếu không có thay đổi nào nữa 
     * thì mới gọi API để cập nhật giỏ hàng.
     */
    public updateCartItem(variantId: string, quantity: number) {
        this.pendingUpdates.set(variantId, quantity);

        if (this.syncTimeout) {
            clearTimeout(this.syncTimeout);
        }

        this.syncTimeout = setTimeout(() => {
            this.syncNow();
        }, this.DELAY_MS);
    }

    public async syncNow() {
        if (this.pendingUpdates.size === 0) return;

        const requestPayload: UpdateCartRequest[] = Array.from(this.pendingUpdates.entries()).map(
            ([id, qty]) => ({ variantId: id, quantity: qty })
        );

        this.pendingUpdates.clear();

        try {
            const response = await cartService.updateCartItem(requestPayload);
            if (this.syncCallback && response.data) {
                this.syncCallback(response.data.newCartCount);
            }
        } catch (error) {
            const errMsg = error.data?.message
                || error.message
                || "Lỗi đồng bộ giỏ hàng";
            throw new Error(errMsg);
        }
    }

    /**
     * Callback function
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

export const cartSyncManager = new CartUpdateDebouncer();