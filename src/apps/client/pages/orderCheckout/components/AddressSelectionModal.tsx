import { memo } from 'react';
import type { Address } from '../../../features/address/models/address.model';
import { useAddressesQuery } from '../../../features/address/hooks/queries/useAddresses.query';

interface AddressSelectionModalProps {
    open: boolean;
    selectedAddressId?: number;
    onClose: () => void;
    onSelect: (address: Address) => void;
}

export const AddressSelectionModal = memo(({ open, selectedAddressId, onClose, onSelect }: AddressSelectionModalProps) => {
    const { data: addresses, isLoading, isError } = useAddressesQuery(open);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-900">Chọn địa chỉ giao hàng</h3>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors">
                        <span className="material-icons-outlined text-xl">close</span>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    {isLoading && (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse bg-slate-100 h-24 rounded-xl"></div>
                            ))}
                        </div>
                    )}

                    {isError && (
                        <div className="text-center py-8">
                            <p className="text-red-500">Đã có lỗi xảy ra khi tải danh sách địa chỉ.</p>
                            <button onClick={onClose} className="mt-4 text-blue-600 font-medium">Đóng</button>
                        </div>
                    )}

                    {!isLoading && !isError && addresses?.length === 0 && (
                        <div className="text-center py-8">
                            <span className="material-icons-outlined text-4xl text-slate-300 mb-2">location_off</span>
                            <p className="text-slate-500">Bạn chưa có địa chỉ giao hàng nào.</p>
                            {/* In a real scenario, there might be a button to add a new address here */}
                        </div>
                    )}

                    {!isLoading && !isError && addresses && addresses.length > 0 && (
                        <div className="space-y-4">
                            {addresses.map(addr => {
                                const isSelected = addr.id === selectedAddressId;
                                return (
                                    <div 
                                        key={addr.id}
                                        onClick={() => onSelect(addr)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-blue-300'}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-slate-900">{addr.fullName}</span>
                                                <span className="text-slate-300">|</span>
                                                <span className="text-slate-600">{addr.phone}</span>
                                            </div>
                                            {isSelected && (
                                                <span className="material-icons-outlined text-blue-600">check_circle</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600">{addr.street}</p>
                                        <p className="text-sm text-slate-600">{addr.ward.name}, {addr.district.name}, {addr.province.name}</p>
                                        {addr.isDefault && (
                                            <span className="inline-block mt-2 px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded border border-slate-200">
                                                Mặc định
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
