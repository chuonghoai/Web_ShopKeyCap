import React from 'react';
import { useAdminCancelOrderModalController } from '../cpnControllers/adminCancelOrderModal.controller';
import { CANCEL_REASONS } from '../../../../client/features/order/constants/cancelReasons.constant';

interface AdminCancelOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: number;
}

export const AdminCancelOrderModal: React.FC<AdminCancelOrderModalProps> = ({ isOpen, onClose, orderId }) => {
    const {
        selectedReason,
        setSelectedReason,
        otherReason,
        setOtherReason,
        handleConfirm,
        isPending
    } = useAdminCancelOrderModalController(orderId, onClose);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Hủy đơn hàng</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-icons-outlined">close</span>
                    </button>
                </div>
                
                <div className="p-6">
                    <p className="text-sm text-slate-600 mb-4">Vui lòng chọn lý do hủy đơn hàng #{orderId}:</p>
                    
                    <div className="space-y-3">
                        {CANCEL_REASONS.map((reason) => (
                            <label key={reason} className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center mt-0.5">
                                    <input 
                                        type="radio" 
                                        name="cancelReason" 
                                        className="peer sr-only"
                                        checked={selectedReason === reason}
                                        onChange={() => setSelectedReason(reason)}
                                    />
                                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-colors"></div>
                                    <span className="material-icons-outlined text-white text-[14px] absolute opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
                                </div>
                                <span className={`text-sm ${selectedReason === reason ? 'text-slate-900 font-medium' : 'text-slate-600 group-hover:text-slate-900'} transition-colors`}>
                                    {reason}
                                </span>
                            </label>
                        ))}
                    </div>

                    {selectedReason === "Khác" && (
                        <div className="mt-4">
                            <textarea
                                value={otherReason}
                                onChange={(e) => setOtherReason(e.target.value)}
                                placeholder="Nhập lý do của bạn..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all resize-none h-24"
                            />
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-xl transition-colors"
                        disabled={isPending}
                    >
                        Đóng
                    </button>
                    <button 
                        onClick={handleConfirm}
                        disabled={isPending || !selectedReason || (selectedReason === "Khác" && !otherReason.trim())}
                        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm shadow-red-600/20"
                    >
                        {isPending ? (
                            <>
                                <span className="material-icons-outlined animate-spin text-[18px]">autorenew</span>
                                Đang xử lý...
                            </>
                        ) : 'Xác nhận hủy'}
                    </button>
                </div>
            </div>
        </div>
    );
};
