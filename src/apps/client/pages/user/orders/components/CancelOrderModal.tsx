import React from 'react';
import { useCancelOrderModalController } from '../cpnController/cancelOrderModal.controller';
import { CANCEL_REASONS } from '../../../../features/order/constants/cancelReasons.constant';

interface CancelOrderModalProps {
    orderId: number;
    isOpen: boolean;
    onClose: () => void;
}

export const CancelOrderModal: React.FC<CancelOrderModalProps> = ({ orderId, isOpen, onClose }) => {
    const {
        selectedReason,
        setSelectedReason,
        otherReason,
        setOtherReason,
        handleConfirm,
        isPending
    } = useCancelOrderModalController(orderId, onClose);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">Lý do hủy đơn</h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
                        <span className="material-icons-outlined">close</span>
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto">
                    <p className="text-sm text-slate-500 mb-4">
                        Bạn đang yêu cầu hủy đơn hàng <span className="font-mono font-medium text-slate-900">#ORDER-{orderId}</span>. Vui lòng cho chúng tôi biết lý do:
                    </p>
                    
                    <div className="flex flex-col gap-3">
                        {CANCEL_REASONS.map(reason => (
                            <label key={reason} className="flex items-start gap-3 cursor-pointer group">
                                <div className="mt-0.5">
                                    <input 
                                        type="radio" 
                                        name="cancel_reason" 
                                        value={reason}
                                        checked={selectedReason === reason}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        className="w-4 h-4 text-rose-600 border-slate-300 focus:ring-rose-600"
                                    />
                                </div>
                                <span className={`text-sm ${selectedReason === reason ? 'text-slate-900 font-medium' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                    {reason}
                                </span>
                            </label>
                        ))}
                        
                        {selectedReason === "Khác" && (
                            <div className="mt-2 pl-7">
                                <textarea
                                    value={otherReason}
                                    onChange={(e) => setOtherReason(e.target.value)}
                                    placeholder="Nhập lý do của bạn..."
                                    className="w-full text-sm border-slate-200 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 p-3 resize-none h-24"
                                />
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="px-6 py-4 border-t border-slate-100 flex gap-3 justify-end bg-slate-50 rounded-b-2xl">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                        disabled={isPending}
                    >
                        Đóng lại
                    </button>
                    <button 
                        onClick={handleConfirm}
                        disabled={!selectedReason || isPending}
                        className="px-5 py-2.5 text-sm font-medium text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isPending ? (
                            <span className="material-icons-outlined animate-spin text-[18px]">autorenew</span>
                        ) : null}
                        Xác nhận hủy
                    </button>
                </div>
            </div>
        </div>
    );
};
