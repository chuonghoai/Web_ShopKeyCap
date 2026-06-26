/**
 * Sản phẩm và số lượng muốn mua
 */
export interface PrepareCheckoutRequest {
    variantId: number;
    quantity: number;
}

export interface PrepareCheckoutRequestWrapper {
    items: PrepareCheckoutRequest[];
    addressId?: number;
}