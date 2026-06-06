import type { EPaymentMethod } from "../enums/paymentMethod.enum";
import type { EPaymentStatus } from "../enums/paymentStatus.enum";

export interface CheckoutResult {
    orderId: string;
    paymentMethod: EPaymentMethod;
    paymentStatus: EPaymentStatus;
}