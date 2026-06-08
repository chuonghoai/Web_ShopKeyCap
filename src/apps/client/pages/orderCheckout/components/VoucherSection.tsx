import React from 'react';

interface VoucherSectionProps {
    onOpenModal: () => void;
}

export const VoucherSection: React.FC<VoucherSectionProps> = ({ onOpenModal }) => {
    return (
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-[16px] font-medium text-slate-900 flex items-center gap-2">
                <span className="material-icons-outlined text-blue-600">confirmation_number</span>
                Voucher của Shop
            </h2>
            
            <div className="flex items-center gap-4">
                <div className="text-[15px] text-slate-500">
                    Chưa áp dụng voucher
                </div>
                <button 
                    onClick={onOpenModal}
                    className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors uppercase"
                >
                    Chọn Voucher
                </button>
            </div>
        </div>
    );
};
