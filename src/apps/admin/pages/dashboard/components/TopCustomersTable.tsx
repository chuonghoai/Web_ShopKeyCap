import React from "react";
import { Trophy } from "lucide-react";
import { useTopCustomersController } from "../cpnController/useTopCustomers.controller";

export const TopCustomersTable: React.FC = () => {
    const { customers, isLoading, isError } = useTopCustomersController();

    const formatCurrency = (amount: number = 0) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    if (isError) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="text-red-500">Lỗi tải danh sách khách hàng hàng đầu.</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-semibold text-slate-900">Khách Hàng Nổi Bật</h3>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                        <tr>
                            <th className="px-6 py-4 font-medium whitespace-nowrap">Hạng</th>
                            <th className="px-6 py-4 font-medium whitespace-nowrap">Khách hàng</th>
                            <th className="px-6 py-4 font-medium whitespace-nowrap text-right">Số đơn</th>
                            <th className="px-6 py-4 font-medium whitespace-nowrap text-right">Tổng chi tiêu</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                    <div className="flex justify-center mb-2">
                                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                    Đang tải...
                                </td>
                            </tr>
                        ) : customers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                    Chưa có khách hàng nào
                                </td>
                            </tr>
                        ) : (
                            customers.map((customer, index) => (
                                <tr key={customer.userId} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                            index === 0 ? 'bg-amber-100 text-amber-700' :
                                            index === 1 ? 'bg-slate-200 text-slate-700' :
                                            index === 2 ? 'bg-orange-100 text-orange-800' :
                                            'bg-slate-100 text-slate-500'
                                        }`}>
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                                                {customer.fullName.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-medium text-slate-900 truncate">{customer.fullName}</div>
                                                <div className="text-sm text-slate-500 truncate">{customer.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-700 font-medium">
                                        {customer.totalOrders}
                                    </td>
                                    <td className="px-6 py-4 text-right text-emerald-600 font-medium whitespace-nowrap">
                                        {formatCurrency(customer.totalSpent)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
