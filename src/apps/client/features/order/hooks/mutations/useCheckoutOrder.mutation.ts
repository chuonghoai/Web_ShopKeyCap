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
            if (!res.data) {
                throw new Error("Không nhận được kết quả đơn hàng từ máy chủ");
            }
            return res.data;
        }
    });
};
