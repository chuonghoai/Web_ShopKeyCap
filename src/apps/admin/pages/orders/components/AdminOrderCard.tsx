import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { OrderAdminModel } from '../../../features/orders/models/order.model';
import { getPaymentMethodConfig } from '../../../../client/features/order/config/paymentMethod.config';
import { EOrderStatus } from '../../../../client/features/order/enums/orderStatus.enum';
import { AdminCancelOrderModal } from './AdminCancelOrderModal';
import { useAdminOrderCardViewModel } from '../cpnControllers/adminOrderCard.viewmodel';

interface AdminOrderCardProps {
    order: OrderAdminModel;
}

export const AdminOrderCard: React.FC<AdminOrderCardProps> = ({ order }) => {
    const {
        statusInfo,
        firstItem,
        moreCount,
        formattedDate,
        formattedTotalAmount
    } = useAdminOrderCardViewModel(order);
    
    const paymentConfig = getPaymentMethodConfig(order.paymentMethod);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors flex flex-col md:flex-row p-5 gap-6 items-start md:items-center">
            
            {/* 1. Hình ảnh + Tên sản phẩm */}
            <div className="flex flex-1 min-w-62.5 gap-4 w-full md:w-auto">
                {firstItem && (
                    <>
                        <div className="w-20 h-20 shrink-0 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                            <img src={firstItem.productImage} alt={firstItem.productName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <h4 className="text-slate-900 font-medium text-base truncate">{firstItem.productName}</h4>
                            <div className="mt-1 text-sm text-slate-500 line-clamp-1">
                                {firstItem.attributes.map(a => `${a.name}: ${a.value}`).join(' • ')}
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                                <span className="text-sm font-medium text-slate-900">x{firstItem.quantity}</span>
                                {moreCount > 0 && (
                                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                                        +{moreCount} sản phẩm khác
                                    </span>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* 2. Order Code, Created Time, Status */}
            <div className="flex flex-col gap-1 w-full md:w-48 shrink-0">
                <span className="font-mono text-sm font-semibold text-slate-900">
                    #ORDER-{order.id}
                </span>
                <span className="text-sm text-slate-500">
                    {formattedDate}
                </span>
                <div className={`flex items-center gap-1.5 text-sm font-medium mt-1 ${statusInfo.colorClass}`}>
                    <span className="material-icons-outlined text-[16px]">{statusInfo.icon}</span>
                    {statusInfo.label}
                </div>
            </div>

            {/* 3. Payment Method */}
            <div className="flex items-center gap-3 w-full md:w-48 shrink-0">
                <div className="w-8 h-8 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center shrink-0 text-slate-500">
                    <span className="material-icons-outlined text-[18px]">{paymentConfig.fallbackMaterialIcon}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Thanh toán</span>
                    <span className="text-sm font-medium text-slate-900">{paymentConfig.title}</span>
                </div>
            </div>

            {/* 4. Total Amount */}
            <div className="flex flex-col w-full md:w-32 shrink-0 md:text-right">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Tổng tiền</span>
                <span className="text-lg font-bold text-slate-900">{formattedTotalAmount}</span>
            </div>

            {/* 5. Actions */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0 md:justify-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0">
                {order.status === EOrderStatus.PENDING && (
                    <button
                        onClick={() => setIsCancelModalOpen(true)}
                        className="px-4 py-2 border border-red-200 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors text-sm whitespace-nowrap"
                    >
                        Hủy đơn
                    </button>
                )}
                <Link 
                    to={`/admin/orders/${order.id}`}
                    className="px-5 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all text-sm whitespace-nowrap shadow-sm"
                >
                    Chi tiết
                </Link>
            </div>

            <AdminCancelOrderModal 
                isOpen={isCancelModalOpen} 
                onClose={() => setIsCancelModalOpen(false)} 
                orderId={order.id} 
            />
        </div>
    );
};
