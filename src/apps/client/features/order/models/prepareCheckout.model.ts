import type { ProductItem } from "../../products/model/product.model";
import type { ProductVariant } from "../../products/model/variant.model";

/**
 * Các sản phẩm được chọn để chuẩn bị tạo đơn hàng
 * Lấy name và imageUrl từ product để hiện thông tin chung của sản phẩm
 * Các thông tin khác lấy từ product variant
 */
type CheckoutItem = {
    product: {
        id: ProductVariant["id"];

        name: ProductItem["name"];
        imageUrl: ProductItem["imageUrl"];

        attributes: ProductVariant["attributes"];
        price: ProductVariant["price"];
        originalPrice: ProductVariant["originalPrice"];
        discountPercentage: ProductVariant["percentDiscount"];
    };
    quantity: number;
    amount: number;     // = quantity * amount
}

export interface PrepareCheckoutModel {
    items: CheckoutItem[];  // Danh sách product muốn mua

    subTotal: number;   // Tổng tiền sản phẩm

    /**
     * Phí vận chuyển đến addressDefault: Backend dựa vào tọa độ của addressDefault, dùng google map để tính giá tiền
     * Nếu user chưa có địa chỉ mặc định, không trả field này
     */
    shippingFee?: number;
    totalAmount: number;    // = subTotal + shippingFee
}