/**
 * Response của API yêu cầu đặt đơn hàng
 * Nếu paymentMethod === COD
 *  => paymentRequired = false, orderId = id đơn hàng, ko trả payUrl
 * Nếu paymentMethod !== COD
 *  => paymentRequired = true, orderId = id đơn hàng, payUrl = url để redirect user thanh toán
 */
export interface CheckoutResponse {
    paymentRequired: boolean,
    orderId: number,
    payUrl: string | null
}
