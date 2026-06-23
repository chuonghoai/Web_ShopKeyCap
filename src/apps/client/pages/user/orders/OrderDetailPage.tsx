import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { OrderDetailSkeleton } from './components/OrderDetailSkeleton';
import { OrderTimeline } from './components/OrderTimeline';
import { DeliveryInfoCard } from './components/DeliveryInfoCard';
import { OrderSummaryCard } from './components/OrderSummaryCard';
import { CancelOrderModal } from './components/CancelOrderModal';
import { useOrderDetailController } from './detailPageController/orderDetailPage.controller';
import { useOrderDetailViewModel } from './detailPageController/orderDetailPage.viewmodel';
import { formatCurrency } from '../../../../../utils/currency.util';
import { formatDateTime } from '../../../../../utils/date.util';
import { EOrderStatus } from '../../../features/order/enums/orderStatus.enum';

const OrderDetailPage: React.FC = () => {
    const { 
        order, isLoading, error, isInvalidId, isCancelModalOpen, setIsCancelModalOpen 
    } = useOrderDetailController();
    
    const viewData = useOrderDetailViewModel(order);

    if (isInvalidId) {
        return <Navigate to="/user/orders" replace />;
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-6">
                <Link to="/user/orders" className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1 w-fit">
                    <span className="material-icons-outlined text-[18px]">arrow_back</span>
                    Quay lại danh sách
                </Link>
                <OrderDetailSkeleton />
            </div>
        );
    }

    if (error || !order || !viewData) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-slate-200">
                <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                    <span className="material-icons-outlined text-[48px] text-rose-300">error_outline</span>
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">Không tìm thấy đơn hàng</h3>
                <p className="text-slate-500 mb-6">Đơn hàng không tồn tại hoặc bạn không có quyền truy cập.</p>
                <Link to="/user/orders" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium">
                    Về danh sách đơn hàng
                </Link>
            </div>
        );
    }

    const { statusInfo, paymentConfig, canCancel } = viewData;

    return (
        <div className="flex flex-col gap-6">
            <Link to="/user/orders" className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1 w-fit transition-colors">
                <span className="material-icons-outlined text-[18px]">arrow_back</span>
                Quay lại danh sách
            </Link>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Header Info */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-3">
                                Chi tiết đơn hàng
                                <span className="font-mono text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                                    #ORDER-{order.id}
                                </span>
                            </h1>
                            <p className="text-slate-500 text-sm">
                                Ngày đặt: {formatDateTime(order.createdAt)}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            {canCancel && (
                                <button
                                    onClick={() => setIsCancelModalOpen(true)}
                                    className="px-5 py-2.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 font-medium rounded-xl transition-all text-sm"
                                >
                                    Hủy đơn hàng
                                </button>
                            )}
                            <div className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 text-sm font-medium ${statusInfo.bgClass} ${statusInfo.colorClass} border-transparent`}>
                                <span className="material-icons-outlined text-[20px]">{statusInfo.icon}</span>
                                {statusInfo.label}
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <OrderTimeline history={order.statusHistory} />

                    {/* Products */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span className="material-icons-outlined text-slate-400">inventory_2</span>
                            Sản phẩm đã đặt
                        </h3>

                        <div className="flex flex-col gap-5">
                            {order.items.map((item, idx) => (
                                <div key={item.id}>
                                    {idx > 0 && <div className="h-px bg-slate-100 mb-5"></div>}
                                    <div className="flex gap-4">
                                        <div className="w-24 h-24 shrink-0 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                                            <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col">
                                            <h4 className="text-slate-900 font-medium text-base truncate">{item.productName}</h4>
                                            <div className="mt-1 text-sm text-slate-500 line-clamp-2">
                                                {item.attributes.map(a => `${a.name}: ${a.value}`).join(' • ')}
                                            </div>
                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-medium text-slate-700">SL: {item.quantity}</span>
                                                    <span className="text-base font-bold text-slate-900">{formatCurrency(item.price)}</span>
                                                </div>
                                                {order.status === EOrderStatus.SUCCESS && (
                                                    <Link 
                                                        to={`/user/orders/${order.id}/reviews?productId=${item.productId}`}
                                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                                                            item.reviewed 
                                                            ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' 
                                                            : 'bg-blue-600 border-transparent text-white hover:bg-blue-700'
                                                        }`}
                                                    >
                                                        {item.reviewed ? 'Xem đánh giá' : 'Đánh giá'}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Content */}
                <div className="w-full lg:w-90 flex flex-col gap-6">
                    <DeliveryInfoCard address={order.address} />

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                            <span className="material-icons-outlined text-slate-400">payment</span>
                            Phương thức thanh toán
                        </h3>
                        <div className="flex items-center gap-3">
                            {paymentConfig.iconUrl ? (
                                <img src={paymentConfig.iconUrl} alt={paymentConfig.title} className="w-8 h-8 object-contain" />
                            ) : (
                                <span className="material-icons-outlined text-[32px] text-blue-600">
                                    {paymentConfig.fallbackMaterialIcon}
                                </span>
                            )}
                            <div>
                                <div className="text-slate-900 font-medium">{paymentConfig.title}</div>
                                {paymentConfig.description && (
                                    <div className="text-xs text-slate-500 mt-0.5">{paymentConfig.description}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <OrderSummaryCard
                        subTotal={order.totalAmount - order.shippingFee}
                        shippingFee={order.shippingFee}
                        totalAmount={order.totalAmount}
                    />
                </div>
            </div>

            <CancelOrderModal
                orderId={order.id}
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
            />
        </div>
    );
};

export default OrderDetailPage;
