import React from 'react';
import type { Address } from '../../../../features/address/models/address.model';

interface DeliveryInfoCardProps {
    address: Address;
}

export const DeliveryInfoCard: React.FC<DeliveryInfoCardProps> = ({ address }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="material-icons-outlined text-slate-400">location_on</span>
                Thông tin nhận hàng
            </h3>

            <div className="flex flex-col gap-4">
                <div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Người nhận</div>
                    <div className="text-slate-900 font-medium">{address.fullName}</div>
                </div>

                <div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Số điện thoại</div>
                    <div className="text-slate-900">{address.phone}</div>
                </div>

                <div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Địa chỉ giao hàng</div>
                    <div className="text-slate-900 leading-relaxed">{address.fullAddress}</div>
                </div>
            </div>
        </div>
    );
};
