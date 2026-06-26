import React from "react";
import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react";
import { useOverviewCardsController } from "../cpnController/useOverviewCards.controller";

export const KPIOverview: React.FC = () => {
    const { revenueData, ordersData, isLoading, isError } = useOverviewCardsController();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm animate-pulse">
                        <div className="h-10 w-10 bg-slate-200 rounded-full mb-4"></div>
                        <div className="h-6 bg-slate-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
                Lỗi tải dữ liệu tổng quan. Vui lòng thử lại.
            </div>
        );
    }

    const formatCurrency = (amount: number = 0) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const formatNumber = (num: number = 0) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };

    const cards = [
        {
            id: 1,
            title: "Tổng Doanh Thu",
            value: formatCurrency(revenueData?.totalRevenue),
            subtitle: "Toàn thời gian",
            icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
            iconBg: "bg-emerald-100"
        },
        {
            id: 2,
            title: "Doanh Thu Hôm Nay",
            value: formatCurrency(revenueData?.todayRevenue),
            subtitle: "Hôm nay",
            icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
            iconBg: "bg-blue-100"
        },
        {
            id: 3,
            title: "Tổng Đơn Hàng",
            value: formatNumber(ordersData?.totalOrders),
            subtitle: "Toàn thời gian",
            icon: <ShoppingCart className="w-5 h-5 text-indigo-600" />,
            iconBg: "bg-indigo-100"
        },
        {
            id: 4,
            title: "Đơn Hôm Nay",
            value: formatNumber(ordersData?.todayOrders),
            subtitle: "Hôm nay",
            icon: <Package className="w-5 h-5 text-amber-600" />,
            iconBg: "bg-amber-100"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card) => (
                <div key={card.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-slate-500">{card.title}</h3>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.iconBg}`}>
                            {card.icon}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-900">{card.value}</div>
                        <p className="text-xs text-slate-400 mt-1">{card.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
