import React from 'react';
import { Link } from 'react-router-dom';
import type { OrderModel } from '../../../../features/order/models/order.model';
import { useOrderCardViewModel } from '../cpnController/orderCard.viewmodel';

interface OrderCardProps {
    order: OrderModel;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const {
        statusInfo,
        firstItem,
        moreCount,
        formattedDate,
        formattedTotalAmount
    } = useOrderCardViewModel(order);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                        #ORDER-{order.id}
                    </span>
                    <span className="text-sm text-slate-500">
                        {formattedDate}
                    </span>
                </div>
                
                {/* No AI SLOP: Neutral text with icon instead of loud badges */}
                <div className={`flex items-center gap-1.5 text-sm font-medium ${statusInfo.colorClass}`}>
                    <span className="material-icons-outlined text-[18px]">{statusInfo.icon}</span>
                    {statusInfo.label}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {firstItem && (
                    <div className="flex gap-4">
                        <div className="w-20 h-20 shrink-0 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                            <img src={firstItem.productImage} alt={firstItem.productName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <h4 className="text-slate-900 font-medium text-base truncate">{firstItem.productName}</h4>
                            <div className="mt-1 text-sm text-slate-500 line-clamp-1">
                                {firstItem.attributes.map((a: any) => `${a.name}: ${a.value}`).join(' • ')}
                            </div>
                            <div className="mt-2 text-sm font-medium text-slate-900">
                                x{firstItem.quantity}
                            </div>
                        </div>
                    </div>
                )}
                {moreCount > 0 && (
                    <div className="mt-3 text-sm text-slate-500 text-center py-2 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                        Và {moreCount} sản phẩm khác
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Tổng tiền</span>
                    <span className="text-lg font-bold text-slate-900">{formattedTotalAmount}</span>
                </div>
                
                <div className="flex gap-3">
                    <Link 
                        to={`/user/orders/${order.id}`}
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm"
                    >
                        Xem chi tiết
                    </Link>
                </div>
            </div>
        </div>
    );
};
