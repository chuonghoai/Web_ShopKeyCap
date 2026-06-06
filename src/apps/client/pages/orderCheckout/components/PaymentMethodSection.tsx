import React from 'react';
import { EPaymentMethod } from '../../../features/order/enums/paymentMethod.enum';
import { PAYMENT_METHODS } from './PaymentMethodModal';

interface PaymentMethodSectionProps {
    selectedMethod: EPaymentMethod;
    onOpenModal: () => void;
}

export const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({ selectedMethod, onOpenModal }) => {
    const selectedOption = PAYMENT_METHODS.find(m => m.id === selectedMethod) || PAYMENT_METHODS[0];

    return (
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-[16px] font-medium text-slate-900 flex items-center gap-2">
                <span className="material-icons-outlined text-blue-600">payments</span>
                Phương thức thanh toán
            </h2>
            
            <div className="flex items-center gap-4">
                <div className="text-[15px] text-slate-700 font-medium flex items-center gap-2">
                    <span className="material-icons-outlined text-[20px] text-blue-600">
                        {selectedOption.icon}
                    </span>
                    {selectedOption.title}
                </div>
                <button 
                    onClick={onOpenModal}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors uppercase"
                >
                    Thay đổi
                </button>
            </div>
        </div>
    );
};
