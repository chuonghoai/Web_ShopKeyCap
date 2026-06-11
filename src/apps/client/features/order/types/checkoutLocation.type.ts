import type { PrepareCheckoutRequest } from "../dto/prepareCheckout.request";

export interface CheckoutLocationState {
    cartItemIds?: number[];
    items?: PrepareCheckoutRequest[];
}
