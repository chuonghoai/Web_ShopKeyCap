import type { CapturePayPalResponse } from "../dto/capturePayPal.response";
import type { PrepareCheckoutRequestWrapper } from "../dto/prepareCheckout.request";
import type { CheckoutRepo } from "./checkout.repo";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { PrepareCheckoutModel } from "../models/prepareCheckout.model";
import type { CheckoutRequest } from "../dto/checkout.request";
import type { CheckoutResponse } from "../dto/checkout.response";
import { EPaymentMethod } from "../enums/paymentMethod.enum";
import type { CheckoutResult } from "../models/checkoutResult.dto";
import { EPaymentStatus } from "../enums/paymentStatus.enum";

export class CheckoutMockRepo implements CheckoutRepo {
    async prepareOrder(_request: PrepareCheckoutRequestWrapper): Promise<ApiResponse<PrepareCheckoutModel>> {
        const response: ApiResponse<PrepareCheckoutModel> = {
            success: true,
            message: "Success",
            data: {
                items: [
                    {
                        product: {
                            id: 1,

                            name: "Bàn phím cơ Akko Mod007 PC",
                            imageUrl: "https://placehold.co/150x150/e2e8f0/64748b?text=Akko",

                            attributes: { "Màu sắc": "Botanical", "Profile": "Cherry" },
                            price: 100000,
                            originalPrice: 120000,
                            discountPercentage: 0,

                        },
                        quantity: 2,
                        amount: 100000 * 2
                    },
                    {
                        product: {
                            id: 2,

                            name: "Bộ Keycap PBT Cherry Profile",
                            imageUrl: "https://placehold.co/150x150/e2e8f0/64748b?text=Keycap",

                            attributes: { "Màu sắc": "Đen", "Chất liệu": "Nhựa" },
                            price: 90000,
                            originalPrice: 100000,
                            discountPercentage: 0,

                        },
                        quantity: 1,
                        amount: 90000 * 1
                    },
                ],

                subTotal: 290000,
                shippingFee: 30000,
                totalAmount: 290000 + 30000,
            },
        };

        return Promise.resolve(response);
    }

    async checkoutOrder(request: CheckoutRequest): Promise<ApiResponse<CheckoutResponse>> {
        const isCOD = request.paymentMethod === EPaymentMethod.COD;
        const mockOrderId = isCOD ? 12345 : 67890;
        
        return Promise.resolve({
            success: true,
            message: "Success",
            data: {
                paymentRequired: !isCOD,
                orderId: mockOrderId,
                payUrl: !isCOD ? "https://example.com/pay" : null
            }
        });
    }

    async getOrderResult(orderId: number): Promise<ApiResponse<CheckoutResult>> {
        let paymentMethod: EPaymentMethod = EPaymentMethod.COD;
        let paymentStatus: EPaymentStatus = EPaymentStatus.PENDING;

        if (orderId === 67890) {
            paymentMethod = EPaymentMethod.MOMO;
            paymentStatus = EPaymentStatus.PAID;
        } else if (orderId === 99999) {
            paymentMethod = EPaymentMethod.MOMO;
            paymentStatus = EPaymentStatus.FAILED;
        }

        return Promise.resolve({
            success: true,
            message: "Success",
            data: {
                orderId,
                paymentMethod,
                paymentStatus
            }
        });
    }

    async capturePayPalPayment(_token: string): Promise<CapturePayPalResponse> {
        return {
            status: "success",
            message: "Thanh toán PayPal thành công (Mock)"
        };
    }
}