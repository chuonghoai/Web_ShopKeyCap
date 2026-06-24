import React from 'react';
import type { DeliveryInfoModel } from '../../../features/address/models/address.model';
import { Link } from 'react-router-dom';

interface DeliveryAddressSectionProps {
    deliveryInfo: DeliveryInfoModel | null;
    isLoading: boolean;
    formatDate: (isoString?: string) => string;
    onChangeAddress: () => void;
}

export const DeliveryAddressSection: React.FC<DeliveryAddressSectionProps> = ({ deliveryInfo, isLoading, formatDate, onChangeAddress }) => {
    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            </div>
        );
    }

    const { address, shippingTime } = deliveryInfo || {};

    return (
        <div className="py-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[18px] font-bold text-slate-900 flex items-center gap-2">
                    <span className="material-icons-outlined text-blue-600">location_on</span>
                    Địa chỉ nhận hàng
                </h2>
                {address && (
                    <button onClick={onChangeAddress} className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        Thay đổi
                    </button>
                )}
            </div>

            <div className="">
                {!address ? (
                    <div className="text-center py-4">
                        <p className="text-slate-500 mb-4">Bạn chưa có địa chỉ giao hàng.</p>
                        <Link to='/user/addresses' className="px-5 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-medium transition-colors">
                            Tạo địa chỉ mặc định
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-6 justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-slate-900">{address.fullName}</span>
                                <span className="text-slate-300">|</span>
                                <span className="font-medium text-slate-700">{address.phone}</span>
                            </div>
                            <p className="text-slate-600 text-[15px]">
                                {address.fullAddress}
                            </p>
                            {address.isDefault && (
                                <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 text-[12px] font-medium rounded-md mt-1">
                                    Mặc định
                                </span>
                            )}
                        </div>

                        {shippingTime && (
                            <div className="bg-emerald-50 rounded-xl p-4 flex items-start gap-3 md:min-w-62.5 shrink-0 border border-emerald-100">
                                <span className="material-icons-outlined text-emerald-600">local_shipping</span>
                                <div>
                                    <p className="text-[13px] text-emerald-800 font-medium mb-1">Thời gian giao hàng dự kiến</p>
                                    <p className="text-[14px] text-emerald-900 font-bold">
                                        {formatDate(shippingTime.earliestDay)} - {formatDate(shippingTime.latestDay)}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
