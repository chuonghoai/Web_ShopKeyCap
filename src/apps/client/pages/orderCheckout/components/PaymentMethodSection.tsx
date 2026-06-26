import React from 'react';
import { EPaymentMethod } from '../../../features/order/enums/paymentMethod.enum';
import { getPaymentMethodConfig } from '../../../features/order/config/paymentMethod.config';

interface PaymentMethodSectionProps {
    selectedMethod: EPaymentMethod;
    onOpenModal: () => void;
}

export const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({ selectedMethod, onOpenModal }) => {
    const selectedOption = getPaymentMethodConfig(selectedMethod);

    return (
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-[16px] font-medium text-slate-900 flex items-center gap-2">
                <span className="material-icons-outlined text-blue-600">payments</span>
                Phương thức thanh toán
            </h2>
            
            <div className="flex items-center gap-4">
                <div className="text-[15px] text-slate-700 font-medium flex items-center gap-2">
                    {selectedOption.iconUrl ? (
                        <img src={selectedOption.iconUrl} alt={selectedOption.title} className="w-5 h-5 object-contain" />
                    ) : (
                        <span className="material-icons-outlined text-[20px] text-blue-600">
                            {selectedOption.fallbackMaterialIcon}
                        </span>
                    )}
                    {selectedOption.title}
                </div>
                <button 
                    onClick={onOpenModal}
                    className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors uppercase"
                >
                    Thay đổi
                </button>
            </div>
        </div>
    );
};
