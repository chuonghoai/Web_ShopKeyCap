import type { Address } from '../../../../features/address/models/address.model';
import { useAddressItemController } from '../cpnController/useAddressItem.controller';
import { MapPin, Phone, Trash2, Edit2, Star } from 'lucide-react';
import clsx from 'clsx';

interface AddressItemProps {
    address: Address;
    onEdit: () => void;
}

export default function AddressItem({ address, onEdit }: AddressItemProps) {
    const { 
        handleDelete, 
        handleSetDefault, 
        isDeleting, 
        isSettingDefault 
    } = useAddressItemController(address);

    return (
        <div className={clsx(
            "p-5 rounded-xl border relative transition-all",
            address.isDefault 
                ? "border-orange-500/50 bg-orange-50/30 shadow-sm" 
                : "border-slate-200 hover:border-slate-300 bg-white"
        )}>
            {address.isDefault && (
                <div className="absolute top-0 right-0 -mt-2.5 -mr-2.5">
                    <span className="bg-orange-100 text-orange-700 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-orange-200">
                        Mặc định
                    </span>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 md:items-start md:justify-between">
                <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-slate-800 text-base">{address.fullName}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-600 text-sm flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {address.phone}
                        </span>
                    </div>

                    <div className="text-sm text-slate-600 flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                            {address.fullAddress}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-3 md:pt-0 border-t border-slate-100 md:border-none">
                    {!address.isDefault && (
                        <button 
                            onClick={handleSetDefault}
                            disabled={isSettingDefault}
                            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
                        >
                            <Star className="w-3.5 h-3.5" />
                            Đặt mặc định
                        </button>
                    )}
                    
                    <button 
                        onClick={onEdit}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Chỉnh sửa"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>

                    <button 
                        onClick={handleDelete}
                        disabled={address.isDefault || isDeleting}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                        title={address.isDefault ? "Không thể xóa địa chỉ mặc định" : "Xóa"}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
