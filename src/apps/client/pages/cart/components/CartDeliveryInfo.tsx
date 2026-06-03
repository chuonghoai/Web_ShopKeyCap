import { memo } from "react";
import type { DeliveryInfoModel } from "../../../features/profile/models/address.model";

interface CartDeliveryInfoProps {
    deliveryInfo: DeliveryInfoModel | null;
    isLoading: boolean;
    onAddAddress: () => void;
}

export const CartDeliveryInfo = memo(({ deliveryInfo, isLoading, onAddAddress }: CartDeliveryInfoProps) => {
    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6 animate-pulse">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="h-5 w-40 bg-slate-200 rounded"></div>
                </div>
                <div className="p-5 space-y-3">
                    <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                    <div className="h-4 w-full bg-slate-200 rounded"></div>
                    <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                </div>
            </div>
        );
    }

    const { address, shippingTime } = deliveryInfo || {};

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }).format(date);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                    <span className="material-icons-outlined text-blue-600 text-[20px]">local_shipping</span>
                    Thông tin giao hàng
                </h2>
                {address && (
                    <button
                        onClick={onAddAddress}
                        className="text-[13px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        Thay đổi
                    </button>
                )}
            </div>

            <div className="p-5">
                {address ? (
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-slate-900">{address.fullName}</span>
                                <span className="text-slate-300">|</span>
                                <span className="text-slate-600">{address.phone}</span>
                            </div>
                            <p className="text-[14px] text-slate-600 leading-relaxed">
                                {address.street}, {address.ward.name}, {address.district.name}, {address.province.name}
                            </p>
                            {address.isDefault && (
                                <span className="inline-block mt-2 px-2 py-0.5 bg-blue-50 text-blue-600 text-[12px] font-medium rounded border border-blue-100">
                                    Mặc định
                                </span>
                            )}
                        </div>

                        {shippingTime && (
                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-[13px] text-slate-500 mb-1">Dự kiến giao hàng:</p>
                                <p className="text-[14px] font-medium text-emerald-600">
                                    {formatDate(shippingTime.earliestDay)} - {formatDate(shippingTime.latestDay)}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-2">
                        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="material-icons-outlined text-amber-500">location_off</span>
                        </div>
                        <p className="text-[14px] text-slate-600 mb-4">Bạn chưa có địa chỉ giao hàng, bổ sung ngay</p>
                        <button
                            onClick={onAddAddress}
                            className="px-4 py-2 bg-blue-600 text-white text-[14px] font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            Thêm địa chỉ
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
});
