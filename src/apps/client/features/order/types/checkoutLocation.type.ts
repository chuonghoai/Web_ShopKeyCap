import type { PrepareCheckoutRequest } from "../dto/prepareCheckout.request";

export interface CheckoutLocationState {
    cartItemIds?: string[];
    items?: PrepareCheckoutRequest[];
}
