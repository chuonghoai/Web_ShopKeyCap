import React from "react";
import { useOrderStatusController } from "../cpnController/useOrderStatus.controller";
import { BasePieChart } from "./charts/BasePieChart";

export const OrderStatusPieChart: React.FC = () => {
    const { data, isLoading, isError } = useOrderStatusController();

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-full min-h-100">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Trạng Thái Đơn Hàng</h3>
                <p className="text-sm text-slate-500">Phân bổ trạng thái của các đơn</p>
            </div>

            <div className="flex-1 w-full relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {isError ? (
                    <div className="flex h-full items-center justify-center text-red-500">
                        Không thể tải phân bố đơn hàng
                    </div>
                ) : data.length === 0 && !isLoading ? (
                    <div className="flex h-full items-center justify-center text-slate-500">
                        Không có đơn hàng nào
                    </div>
                ) : (
                    <div className="h-full min-h-75">
                        <BasePieChart data={data} innerRadius={60} outerRadius={100} />
                    </div>
                )}
            </div>
        </div>
    );
};
