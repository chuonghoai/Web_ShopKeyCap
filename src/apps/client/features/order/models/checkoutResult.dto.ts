import type { EPaymentMethod } from "../enums/paymentMethod.enum";
import type { EPaymentStatus } from "../enums/paymentStatus.enum";

export interface CheckoutResult {
    orderId: number;
    paymentMethod: EPaymentMethod;
    paymentStatus: EPaymentStatus;
}