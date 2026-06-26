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
            <div className="py-6 animate-pulse w-full max-w-sm ml-auto">
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
        <div className="py-6 flex flex-col items-end">
            <div className="w-full max-w-sm space-y-4 text-[15px]">
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

                <div className="pt-4 border-t border-slate-100 border-dashed flex justify-between items-center">
                    <span className="text-[16px] font-medium text-slate-900">Tổng thanh toán</span>
                    <div className="text-right">
                        <span className="block text-[28px] font-bold text-blue-600 leading-none">
                            {formatPrice(totalAmount)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
