import React from 'react';

interface VoucherModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h3 className="text-lg font-bold text-slate-900">Chọn Voucher Shop</h3>
                    <button 
                        onClick={onClose}
                        className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        <span className="material-icons-outlined">close</span>
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto min-h-50 flex items-center justify-center">
                    <div className="text-center">
                        <span className="material-icons-outlined text-[48px] text-slate-200 mb-2">confirmation_number</span>
                        <p className="text-slate-500 font-medium">Chưa có voucher nào khả dụng</p>
                    </div>
                </div>
                
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2.5 bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors"
                    >
                        Trở lại
                    </button>
                </div>
            </div>
        </div>
    );
};
