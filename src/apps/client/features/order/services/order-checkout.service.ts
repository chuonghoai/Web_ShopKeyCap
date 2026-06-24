import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { CheckoutRequest } from "../dto/checkout.request";
import type { CheckoutResponse } from "../dto/checkout.response";
import type { PrepareCheckoutRequestWrapper } from "../dto/prepareCheckout.request";
import type { CheckoutResult } from "../models/checkoutResult.dto";
import type { PrepareCheckoutModel } from "../models/prepareCheckout.model";
import type { CapturePayPalResponse } from "../dto/capturePayPal.response";
import type { CheckoutRepo } from "../repositories/checkout.repo";
import { CheckoutApiRepo } from "../repositories/checkoutApi.repo";
import { CheckoutMockRepo } from "../repositories/checkoutMock.repo";

export class OrderCheckoutService {
    private readonly checkoutRepo: CheckoutRepo;
    constructor(checkoutRepo: CheckoutRepo) {
        this.checkoutRepo = checkoutRepo;
    }

    /**
     * Prepare checkout
     */
    async prepareOrder(request: PrepareCheckoutRequestWrapper): Promise<ApiResponse<PrepareCheckoutModel>> {
        return this.checkoutRepo.prepareOrder(request);
    }

    /**
     * Request checkout order
     */
    async checkoutOrder(request: CheckoutRequest): Promise<ApiResponse<CheckoutResponse>> {
        return this.checkoutRepo.checkoutOrder(request);
    }

    /**
     * Check order result
     */
    async getOrderResult(orderId: number): Promise<ApiResponse<CheckoutResult>> {
        return this.checkoutRepo.getOrderResult(orderId);
    }

    /**
     * Capture PayPal payment
     */
    async capturePayPalPayment(token: string): Promise<CapturePayPalResponse> {
        return this.checkoutRepo.capturePayPalPayment(token);
    }
}

export const orderCheckoutService = new OrderCheckoutService(USE_MOCK ? new CheckoutMockRepo() : new CheckoutApiRepo())