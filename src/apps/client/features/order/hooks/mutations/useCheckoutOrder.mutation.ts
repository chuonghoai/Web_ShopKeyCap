import { useMutation } from "@tanstack/react-query";
import { orderCheckoutService } from "../../services/order-checkout.service";
import type { CheckoutRequest } from "../../dto/checkout.request";
import type { CheckoutResponse } from "../../dto/checkout.response";

export const useCheckoutOrderMutation = () => {
    return useMutation<CheckoutResponse, Error, CheckoutRequest>({
        mutationFn: async (request: CheckoutRequest) => {
            const res = await orderCheckoutService.checkoutOrder(request);
            if (!res.success) {
                throw new Error(res.message || "Đặt hàng thất bại");
            }
            // res.data có thể nullable tuỳ vào implement, ta non-null assertion hoặc fallback nếu cần
            if (!res.data) {
                throw new Error("Không nhận được kết quả đơn hàng từ máy chủ");
            }
            return res.data;
        }
    });
};
