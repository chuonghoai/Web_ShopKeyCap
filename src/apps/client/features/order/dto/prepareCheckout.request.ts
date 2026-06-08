/**
 * Sản phẩm và số lượng muốn mua
 */
export interface PrepareCheckoutRequest {
    variantId: string;
    quantity: number;
}

export interface PrepareCheckoutRequestWrapper {
    items: PrepareCheckoutRequest[];
    addressId?: string;
}