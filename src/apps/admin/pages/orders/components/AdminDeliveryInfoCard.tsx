import React from 'react';

interface AdminDeliveryInfoCardProps {
    address: string;
}

export const AdminDeliveryInfoCard: React.FC<AdminDeliveryInfoCardProps> = ({ address }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="material-icons-outlined text-slate-400">location_on</span>
                Thông tin nhận hàng
            </h3>

            <div className="flex flex-col gap-4">
                <div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Địa chỉ giao hàng</div>
                    <div className="text-slate-900 leading-relaxed">{address}</div>
                </div>
            </div>
        </div>
    );
};
