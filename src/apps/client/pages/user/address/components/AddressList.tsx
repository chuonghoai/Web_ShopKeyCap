import React from 'react';
import { Plus, MapPinOff } from 'lucide-react';
import { useAddressListController } from '../cpnController/useAddressList.controller';
import AddressItem from './AddressItem';

interface AddressListProps {
    onAddNew: () => void;
    onEdit: (addressId: number) => void;
}

export default function AddressList({ onAddNew, onEdit }: AddressListProps) {
    const { addresses, isLoading, isError, error } = useAddressListController();

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse bg-slate-100 rounded-lg h-32 w-full" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm flex flex-col items-center">
                <span className="font-medium">{error}</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-slate-800">Danh sách địa chỉ ({addresses.length})</h2>
                <button 
                    onClick={onAddNew}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors shadow-sm hover:shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    <span>Thêm địa chỉ mới</span>
                </button>
            </div>

            {addresses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                        <MapPinOff className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-slate-500 text-sm mb-4 text-center">Bạn chưa có địa chỉ giao hàng nào.<br/>Vui lòng thêm địa chỉ để thuận tiện cho việc mua sắm.</p>
                    <button 
                        onClick={onAddNew}
                        className="text-orange-600 font-medium text-sm hover:underline"
                    >
                        Thêm địa chỉ ngay
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {addresses.map((address) => (
                        <AddressItem 
                            key={address.id} 
                            address={address} 
                            onEdit={() => onEdit(address.id)} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
