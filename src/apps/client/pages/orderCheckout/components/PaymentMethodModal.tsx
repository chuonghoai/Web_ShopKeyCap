import React from 'react';
import { EPaymentMethod } from '../../../features/order/enums/paymentMethod.enum';

interface PaymentMethodModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedMethod: EPaymentMethod;
    onSelectMethod: (method: EPaymentMethod) => void;
}

export const PAYMENT_METHODS = [
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

export const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
    isOpen,
    onClose,
    selectedMethod,
    onSelectMethod
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h3 className="text-lg font-bold text-slate-900">Chọn phương thức thanh toán</h3>
                    <button 
                        onClick={onClose}
                        className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        <span className="material-icons-outlined">close</span>
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto">
                    <div className="flex flex-col gap-3">
                        {PAYMENT_METHODS.map((method) => {
                            const isSelected = selectedMethod === method.id;
                            return (
                                <div
                                    key={method.id}
                                    onClick={() => {
                                        onSelectMethod(method.id);
                                        onClose();
                                    }}
                                    className={`cursor-pointer border rounded-xl p-4 transition-all duration-200 flex items-center gap-4 ${
                                        isSelected 
                                        ? 'border-blue-600 bg-blue-50/50' 
                                        : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50/50'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                        isSelected ? 'border-blue-600' : 'border-slate-300'
                                    }`}>
                                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>}
                                    </div>
                                    <span className={`material-icons-outlined text-[24px] ${isSelected ? 'text-blue-600' : 'text-slate-500'}`}>
                                        {method.icon}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className={`font-medium ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                                            {method.title}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};
