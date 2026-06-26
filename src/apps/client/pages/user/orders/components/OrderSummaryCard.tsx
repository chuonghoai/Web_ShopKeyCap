import React from 'react';
import { useOrderSummaryCardViewModel } from '../cpnController/orderSummaryCard.viewmodel';

interface OrderSummaryCardProps {
    subTotal: number;
    shippingFee: number;
    totalAmount: number;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ subTotal, shippingFee, totalAmount }) => {
    const {
        formattedSubTotal,
        formattedShippingFee,
        formattedTotalAmount
    } = useOrderSummaryCardViewModel(subTotal, shippingFee, totalAmount);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-base font-bold text-slate-900 mb-5">Tổng kết đơn hàng</h3>
            
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-slate-600 text-sm">
                    <span>Tạm tính</span>
                    <span className="font-medium text-slate-900">{formattedSubTotal}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 text-sm">
                    <span>Phí giao hàng</span>
                    <span className="font-medium text-slate-900">{formattedShippingFee}</span>
                </div>
                
                <div className="h-px bg-slate-100 my-1"></div>
                
                <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-900">Tổng cộng</span>
                    <span className="text-xl font-bold text-blue-600">{formattedTotalAmount}</span>
                </div>
            </div>
        </div>
    );
};
