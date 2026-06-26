import React from "react";
import { useRevenueChartController } from "../cpnController/useRevenueChart.controller";
import { BaseLineChart } from "./charts/BaseLineChart";

export const RevenueLineChart: React.FC = () => {
    const { period, setPeriod, data, isLoading, isError } = useRevenueChartController();

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', { 
            notation: "compact", 
            compactDisplay: "short" 
        }).format(value);
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-full min-h-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">Biểu Đồ Doanh Thu</h3>
                    <p className="text-sm text-slate-500">Thống kê doanh thu theo thời gian</p>
                </div>
                <select 
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="border border-slate-300 rounded-md text-sm px-3 py-1.5 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="week">Tuần này</option>
                    <option value="month">Tháng này</option>
                </select>
            </div>

            <div className="flex-1 w-full relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                
                {isError ? (
                    <div className="flex h-full items-center justify-center text-red-500">
                        Không thể tải biểu đồ doanh thu
                    </div>
                ) : data.length === 0 && !isLoading ? (
                    <div className="flex h-full items-center justify-center text-slate-500">
                        Không có dữ liệu hiển thị
                    </div>
                ) : (
                    <BaseLineChart 
                        data={data} 
                        xAxisKey="label" 
                        lineKey="value" 
                        yAxisTickFormatter={formatCurrency} 
                    />
                )}
            </div>
        </div>
    );
};
