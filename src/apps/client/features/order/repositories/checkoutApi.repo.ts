import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { CheckoutRequest } from "../dto/checkout.request";
import type { CheckoutResponse } from "../dto/checkout.response";
import type { CapturePayPalResponse } from "../dto/capturePayPal.response";
import type { PrepareCheckoutRequestWrapper } from "../dto/prepareCheckout.request";
import type { CheckoutResult } from "../models/checkoutResult.dto";
import type { PrepareCheckoutModel } from "../models/prepareCheckout.model";
import type { CheckoutRepo } from "./checkout.repo";

export class CheckoutApiRepo implements CheckoutRepo {
    /**
     * POST /orders/prepare
     * @body request: PrepareCheckoutRequestWrapper
     * @returns PrepareCheckoutModel
     */
    async prepareOrder(request: PrepareCheckoutRequestWrapper): Promise<ApiResponse<PrepareCheckoutModel>> {
        return apiClient.post<ApiResponse<PrepareCheckoutModel>>("/orders/prepare", request);
    }

    /**
     * POST /orders/checkout
     * @body CheckoutRequest
     * @returns CheckoutResponse
     * 
     * Mô tả:
     *  - Nếu CheckoutRequest.paymentMethod là COD 
     *      => paymentRequired = false, orderId = id đơn hàng vừa tạo, payUrl = null
     *  - Nếu CheckoutRequest.paymentMethod là MOMO 
     *      => paymentRequired = true, orderId = id đơn hàng vừa tạo, payUrl = url để redirect user thanh toán
     */
    async checkoutOrder(request: CheckoutRequest): Promise<ApiResponse<CheckoutResponse>> {
        return apiClient.post<ApiResponse<CheckoutResponse>>("/orders/checkout", request);
    }

    /**
     * GET /orders/checkout/:id/payment-status
     * @param orderId
     * @returns CheckoutResultDto
     */
    async getOrderResult(orderId: number): Promise<ApiResponse<CheckoutResult>> {
        return apiClient.get<ApiResponse<CheckoutResult>>(`/orders/checkout/${orderId}/payment-status`);
    }

    /**
     * POST /api/payment/paypal/capture
     * @param token 
     * @returns CapturePayPalResponse
     */
    async capturePayPalPayment(token: string): Promise<CapturePayPalResponse> {
        return apiClient.post<CapturePayPalResponse>(`/api/payment/paypal/capture?token=${token}`);
    }
}