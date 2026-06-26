import React from 'react';
import { OrderCard } from './components/OrderCard';
import { OrderListSkeleton } from './components/OrderListSkeleton';
import { useOrderListController } from './listPageController/orderListPage.controller';
import { ORDER_TABS } from '../../../features/order/constants/orderTabs.constant';

const OrderListPage: React.FC = () => {
    const { activeTab, setActiveTab, orders, isLoading } = useOrderListController();

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Đơn hàng của tôi</h1>
                <p className="text-slate-500 mt-1">Theo dõi và quản lý các đơn hàng bạn đã đặt</p>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200">
                {ORDER_TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                                isActive 
                                ? 'border-blue-600 text-blue-600' 
                                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                            }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* List */}
            <div className="mt-2 min-h-100">
                {isLoading ? (
                    <OrderListSkeleton />
                ) : !orders || orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <span className="material-icons-outlined text-[48px] text-slate-300">inventory_2</span>
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">Chưa có đơn hàng nào</h3>
                        <p className="text-slate-500">Bạn chưa có đơn hàng nào trong trạng thái này.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderListPage;
