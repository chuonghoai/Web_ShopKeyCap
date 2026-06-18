import React from 'react';
import { useAdminOrderSummaryCardViewModel } from '../cpnControllers/adminOrderSummaryCard.viewmodel';
import type { PaymentMethodConfig } from '../../../../client/features/order/config/paymentMethod.config';

interface AdminOrderSummaryCardProps {
    subTotal: number;
    shippingFee: number;
    totalAmount: number;
    paymentConfig: PaymentMethodConfig;
}

export const AdminOrderSummaryCard: React.FC<AdminOrderSummaryCardProps> = ({ subTotal, shippingFee, totalAmount, paymentConfig }) => {
    const { formattedSubTotal, formattedShippingFee, formattedTotalAmount } = useAdminOrderSummaryCardViewModel(subTotal, shippingFee, totalAmount);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col h-full">
            <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="material-icons-outlined text-slate-400">receipt_long</span>
                Tổng kết đơn hàng
            </h3>

            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Tạm tính</span>
                    <span className="font-medium text-slate-900">{formattedSubTotal}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Phí vận chuyển</span>
                    <span className="font-medium text-slate-900">{formattedShippingFee}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Phương thức thanh toán</span>
                    <div className="flex items-center gap-1.5 text-slate-900 font-medium">
                        <span className="material-icons-outlined text-[16px] text-slate-400">{paymentConfig.fallbackMaterialIcon}</span>
                        {paymentConfig.title}
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-base font-bold text-slate-900">Tổng cộng</span>
                <span className="text-xl font-bold text-blue-600">{formattedTotalAmount}</span>
            </div>
        </div>
    );
};
