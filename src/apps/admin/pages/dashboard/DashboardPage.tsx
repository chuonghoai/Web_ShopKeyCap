import React from "react";
import { KPIOverview } from "./components/KPIOverview";
import { RevenueLineChart } from "./components/RevenueLineChart";
import { OrderStatusPieChart } from "./components/OrderStatusPieChart";
import { TopCustomersTable } from "./components/TopCustomersTable";
import { useDashboardController } from "./useDashboard.controller";

export const DashboardPage: React.FC = () => {
    const { handleRefresh } = useDashboardController();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-sm text-slate-500">Tổng quan tình hình kinh doanh của cửa hàng.</p>
                </div>
                
                <button 
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                    Làm mới dữ liệu
                </button>
            </div>

            {/* KPI Cards Row */}
            <KPIOverview />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RevenueLineChart />
                </div>
                <div className="lg:col-span-1">
                    <OrderStatusPieChart />
                </div>
            </div>

            {/* Bottom Row - Tables */}
            <div className="grid grid-cols-1 gap-6">
                <TopCustomersTable />
            </div>
        </div>
    );
};
