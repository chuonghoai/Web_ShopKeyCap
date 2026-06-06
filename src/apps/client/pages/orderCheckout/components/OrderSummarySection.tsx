import React from 'react';

interface OrderSummarySectionProps {
    subTotal: number;
    shippingFee?: number;
    totalAmount: number;
    formatPrice: (price: number) => string;
    isLoading: boolean;
}

export const OrderSummarySection: React.FC<OrderSummarySectionProps> = ({ 
    subTotal, 
    shippingFee, 
    totalAmount, 
    formatPrice,
    isLoading
}) => {
    if (isLoading) {
        return (
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 mb-6 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    </div>
                    <div className="flex justify-between">
                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    </div>
                    <div className="border-t border-slate-100 pt-3 mt-3 flex justify-between">
                        <div className="h-5 bg-slate-200 rounded w-1/3"></div>
                        <div className="h-6 bg-slate-200 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-[18px] font-bold text-slate-900 flex items-center gap-2">
                    <span className="material-icons-outlined text-blue-600">receipt_long</span>
                    Tổng quan đơn hàng
                </h2>
            </div>
            <div className="p-6 space-y-4 text-[15px]">
                <div className="flex justify-between items-center text-slate-600">
                    <span>Tổng tiền hàng</span>
                    <span className="font-medium text-slate-900">{formatPrice(subTotal)}</span>
                </div>
                
                <div className="flex justify-between items-center text-slate-600">
                    <span>Phí vận chuyển</span>
                    <span className="font-medium text-slate-900">
                        {shippingFee !== undefined ? formatPrice(shippingFee) : 'Chưa tính'}
                    </span>
                </div>

                <div className="pt-4 border-t border-slate-100 border-dashed flex justify-between items-end">
                    <span className="text-[16px] font-medium text-slate-900">Tổng thanh toán</span>
                    <div className="text-right">
                        <span className="block text-[24px] font-bold text-blue-600 leading-none">
                            {formatPrice(totalAmount)}
                        </span>
                        <span className="text-[12px] text-slate-400 mt-1 block">(Đã bao gồm VAT)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
