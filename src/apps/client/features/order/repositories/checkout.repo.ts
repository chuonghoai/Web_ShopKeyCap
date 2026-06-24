import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { CheckoutRequest } from "../dto/checkout.request";
import type { CheckoutResponse } from "../dto/checkout.response";
import type { CapturePayPalResponse } from "../dto/capturePayPal.response";
import type { PrepareCheckoutRequestWrapper } from "../dto/prepareCheckout.request";
import type { CheckoutResult } from "../models/checkoutResult.dto";
import type { PrepareCheckoutModel } from "../models/prepareCheckout.model";

export interface CheckoutRepo {
    prepareOrder(request: PrepareCheckoutRequestWrapper): Promise<ApiResponse<PrepareCheckoutModel>>;

    checkoutOrder(request: CheckoutRequest): Promise<ApiResponse<CheckoutResponse>>;

    getOrderResult(orderId: number): Promise<ApiResponse<CheckoutResult>>;

    capturePayPalPayment(token: string): Promise<CapturePayPalResponse>;
}