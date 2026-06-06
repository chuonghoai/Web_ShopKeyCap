import type { EPaymentMethod } from "../enums/paymentMethod.enum";

/**
 * Mua sản phẩm variantId với số lượng quantity
 * Backend tự check giá trong database
 */
export interface CheckoutItemRequest {
    variantId: string;
    quantity: number;
}

interface CartItemIds {
    id: string;
}

/**
 * Yêu cầu tạo đơn hàng
 * - items: Danh sách các sản phẩm muốn mua
 * - addressId: Id địa chỉ giao hàng (đã lưu trong database)
 * - voucherIds: Danh sách id voucher đã chọn, Fe có thể gửi hoặc ko gửi voucher
 * - paymentMethod: Phương thức thanh toán
 *  - cartItemIds: 
 *      + Nếu có truyền field -> Tức là đặt hàng từ giỏ hàng -> cập nhật giỏ hàng
 *      + Nếu ko truyền field -> Tức là đặt hàng từ trang chi tiết sản phẩm -> ko liên quan giỏ hàng
 */
export interface CheckoutRequest {
    items: CheckoutItemRequest[];

    addressId: string;

    voucherIds?: string[];

    paymentMethod: EPaymentMethod;

    cartItemIds?: CartItemIds[];
}
