import React from 'react';
import { useOrderDetailController } from './detailPageController/OrderDetail.controller';
import { AdminDeliveryInfoCard } from './components/AdminDeliveryInfoCard';
import { AdminOrderSummaryCard } from './components/AdminOrderSummaryCard';
import { AdminOrderTimeline } from './components/AdminOrderTimeline';
import { AdminCancelOrderModal } from './components/AdminCancelOrderModal';
import { formatCurrency } from '../../../../utils/currency.util';
import { getPaymentMethodConfig } from '../../../client/features/order/config/paymentMethod.config';
import { EOrderStatus } from '../../../client/features/order/enums/orderStatus.enum';
import { getNextOrderStatusLabel, getNextOrderStatus } from '../../features/orders/utils/nextStatus.util';
import { getOrderStatusInfo } from '../../../client/features/order/utils/orderStatus.util';
import { ChevronLeft } from 'lucide-react';

export const OrderDetailPage: React.FC = () => {
    const {
        order,
        isLoading,
        error,
        isInvalidId,
        orderId,
        isCancelModalOpen,
        setIsCancelModalOpen,
        handleUpdateStatus,
        handlePrintInvoice,
        isUpdatingStatus,
        navigate
    } = useOrderDetailController();

    if (isInvalidId) return <div className="p-8 text-center text-red-500">ID đơn hàng không hợp lệ</div>;
    if (isLoading) return <div className="p-8 text-center text-slate-500">Đang tải chi tiết đơn hàng...</div>;
    if (error || !order) return <div className="p-8 text-center text-red-500">Đã xảy ra lỗi khi tải dữ liệu!</div>;

    const paymentConfig = getPaymentMethodConfig(order.paymentMethod);
    const statusInfo = getOrderStatusInfo(order.status);
    const nextStatus = getNextOrderStatus(order.status);
    const nextStatusLabel = getNextOrderStatusLabel(nextStatus);

    return (
        <div className="w-full pb-20">
            <div className="mb-6 flex items-center justify-between">
                <button
                    onClick={() => navigate('/admin/orders')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors w-fit"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-medium">Quay lại danh sách</span>
                </button>
            </div>

            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Chi tiết đơn hàng #{order.id}</h1>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${statusInfo.colorClass} border-current/20`}>
                        <span className="material-icons-outlined text-[16px]">{statusInfo.icon}</span>
                        {statusInfo.label}
                    </span>
                </div>
                <p className="text-slate-500 text-sm">Quản lý trạng thái và thông tin chi tiết</p>
            </div>

            <div className="mb-6">
                <AdminOrderTimeline history={order.statusHistory} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <AdminDeliveryInfoCard address={order.address} />

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                            <span className="material-icons-outlined text-slate-400">inventory_2</span>
                            Sản phẩm ({order.items.length})
                        </h3>

                        <div className="flex flex-col gap-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <div className="w-20 h-20 bg-white rounded-lg border border-slate-200 overflow-hidden shrink-0">
                                        <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col">
                                        <h4 className="text-slate-900 font-medium truncate mb-1">{item.productName}</h4>
                                        <div className="text-sm text-slate-500 mb-2">
                                            {item.attributes.map(a => `${a.name}: ${a.value}`).join(' • ')}
                                        </div>
                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-slate-900 font-medium">{formatCurrency(item.price)}</span>
                                            <span className="text-sm text-slate-500">x{item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <AdminOrderSummaryCard
                        subTotal={order.totalAmount - order.shippingFee}
                        shippingFee={order.shippingFee}
                        totalAmount={order.totalAmount}
                        paymentConfig={paymentConfig}
                    />

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-3">
                        {nextStatus && (
                            <button
                                onClick={handleUpdateStatus}
                                disabled={isUpdatingStatus}
                                className="w-full justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm shadow-blue-600/20"
                            >
                                {isUpdatingStatus ? (
                                    <span className="material-icons-outlined animate-spin text-[18px]">autorenew</span>
                                ) : (
                                    <span className="material-icons-outlined text-[18px]">arrow_forward</span>
                                )}
                                {nextStatusLabel}
                            </button>
                        )}

                        {order.status === EOrderStatus.PENDING && (
                            <button
                                onClick={() => setIsCancelModalOpen(true)}
                                className="w-full justify-center px-6 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-medium text-sm transition-colors flex items-center gap-2"
                            >
                                <span className="material-icons-outlined text-[18px]">cancel</span>
                                Hủy đơn hàng
                            </button>
                        )}

                        {order.status === EOrderStatus.SUCCESS && (
                            <button
                                onClick={handlePrintInvoice}
                                className="w-full justify-center px-6 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl font-medium text-sm transition-colors flex items-center gap-2"
                            >
                                <span className="material-icons-outlined text-[18px]">print</span>
                                In hóa đơn
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <AdminCancelOrderModal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                orderId={orderId}
            />
        </div>
    );
};
