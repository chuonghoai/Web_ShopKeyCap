import React from 'react';
import { EPaymentMethod } from '../../../features/order/enums/paymentMethod.enum';

interface PaymentMethodSectionProps {
    selectedMethod: EPaymentMethod;
    onSelectMethod: (method: EPaymentMethod) => void;
}

export const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({ selectedMethod, onSelectMethod }) => {
    const paymentMethods = [
        {
            id: EPaymentMethod.COD,
            title: 'Thanh toán khi nhận hàng (COD)',
            description: 'Thanh toán bằng tiền mặt khi nhận hàng',
            icon: 'local_atm'
        },
        {
            id: EPaymentMethod.VNPAY,
            title: 'Thanh toán qua VNPAY',
            description: 'Thẻ ATM nội địa / Thẻ quốc tế / VNPAY QR',
            icon: 'account_balance_wallet'
        },
        {
            id: EPaymentMethod.MOMO,
            title: 'Thanh toán qua Ví MoMo',
            description: 'Thanh toán nhanh chóng bằng ví điện tử MoMo',
            icon: 'qr_code_scanner'
        },
        {
            id: EPaymentMethod.PAYPAL,
            title: 'Thanh toán qua PayPal',
            description: 'Thanh toán an toàn với thẻ tín dụng quốc tế',
            icon: 'payment'
        }
    ];

    return (
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-[18px] font-bold text-slate-900 flex items-center gap-2">
                    <span className="material-icons-outlined text-blue-600">payments</span>
                    Phương thức thanh toán
                </h2>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                        const isSelected = selectedMethod === method.id;
                        return (
                            <div
                                key={method.id}
                                onClick={() => onSelectMethod(method.id)}
                                className={`cursor-pointer border-2 rounded-2xl p-4 transition-all duration-200 flex items-start gap-4 ${
                                    isSelected 
                                    ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                                    : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50/50'
                                }`}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                    isSelected ? 'border-blue-600' : 'border-slate-300'
                                }`}>
                                    {isSelected && <div className="w-3 h-3 rounded-full bg-blue-600"></div>}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`material-icons-outlined text-[20px] ${isSelected ? 'text-blue-600' : 'text-slate-500'}`}>
                                            {method.icon}
                                        </span>
                                        <span className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                                            {method.title}
                                        </span>
                                    </div>
                                    <p className="text-[13px] text-slate-500 ml-7">
                                        {method.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
