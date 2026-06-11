import { EPaymentMethod } from "../enums/paymentMethod.enum";

export interface PaymentMethodConfig {
    id: EPaymentMethod;
    title: string;
    description?: string;
    iconUrl?: string; // Tương lai dùng icon thật
    fallbackMaterialIcon: string;
}

export const PAYMENT_METHODS_CONFIG: PaymentMethodConfig[] = [
    {
        id: EPaymentMethod.COD,
        title: 'Thanh toán khi nhận hàng (COD)',
        description: 'Thanh toán bằng tiền mặt khi nhận hàng',
        fallbackMaterialIcon: 'local_atm',
    },
    {
        id: EPaymentMethod.VNPAY,
        title: 'Thanh toán qua VNPAY',
        description: 'Thẻ ATM nội địa / Thẻ quốc tế / VNPAY QR',
        fallbackMaterialIcon: 'account_balance_wallet',
    },
    {
        id: EPaymentMethod.MOMO,
        title: 'Thanh toán qua Ví MoMo',
        description: 'Thanh toán nhanh chóng bằng ví điện tử MoMo',
        fallbackMaterialIcon: 'qr_code_scanner',
    },
    {
        id: EPaymentMethod.PAYPAL,
        title: 'Thanh toán qua PayPal',
        description: 'Thanh toán an toàn với thẻ tín dụng quốc tế',
        fallbackMaterialIcon: 'payment',
    }
];

export const getPaymentMethodConfig = (id: EPaymentMethod | string): PaymentMethodConfig => {
    return PAYMENT_METHODS_CONFIG.find(m => m.id === id) || PAYMENT_METHODS_CONFIG[0];
};
