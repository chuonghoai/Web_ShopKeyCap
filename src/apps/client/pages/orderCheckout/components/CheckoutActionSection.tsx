import React from 'react';

interface CheckoutActionSectionProps {
    onCheckout: () => void;
    isSubmitting: boolean;
    isDisabled: boolean;
}

export const CheckoutActionSection: React.FC<CheckoutActionSectionProps> = ({ 
    onCheckout, 
    isSubmitting, 
    isDisabled
}) => {
    return (
        <div className="pb-12 pt-4 flex flex-col items-end">
            <div className="w-full max-w-sm">
                <button
                    onClick={onCheckout}
                    disabled={isSubmitting || isDisabled}
                    className={`w-full py-4 rounded-xl cursor-pointer font-bold text-[16px] shadow-sm transition-all flex items-center justify-center gap-2 ${
                        isSubmitting || isDisabled
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md text-white hover:-translate-y-0.5 active:translate-y-0'
                    }`}
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            Đang xử lý...
                        </>
                    ) : (
                        <>
                            Đặt hàng ngay
                        </>
                    )}
                </button>
                {isDisabled && !isSubmitting && (
                    <p className="text-right text-red-500 text-[13px] mt-2 font-medium">
                        Vui lòng thêm địa chỉ giao hàng
                    </p>
                )}
            </div>
        </div>
    );
};
