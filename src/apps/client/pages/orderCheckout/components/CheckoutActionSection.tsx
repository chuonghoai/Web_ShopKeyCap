import React from 'react';

interface CheckoutActionSectionProps {
    onCheckout: () => void;
    isSubmitting: boolean;
    isDisabled: boolean;
    totalAmount: number;
    formatPrice: (price: number) => string;
}

export const CheckoutActionSection: React.FC<CheckoutActionSectionProps> = ({ 
    onCheckout, 
    isSubmitting, 
    isDisabled,
    totalAmount, 
    formatPrice 
}) => {
    return (
        <div className="bg-white rounded-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.04)] border-t border-slate-100 p-6 sticky bottom-0 z-10 lg:relative lg:border lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
                <div className="flex-1 w-full text-center sm:text-left">
                    <p className="text-slate-500 text-sm mb-1">Tổng thanh toán</p>
                    <p className="text-3xl font-bold text-blue-600">{formatPrice(totalAmount)}</p>
                </div>
                
                <div className="w-full sm:w-auto">
                    <button
                        onClick={onCheckout}
                        disabled={isSubmitting || isDisabled}
                        className={`w-full sm:w-70 py-4 rounded-xl font-bold text-[16px] shadow-sm transition-all flex items-center justify-center gap-2 ${
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
                                <span className="material-icons-outlined text-[20px]">shopping_bag</span>
                            </>
                        )}
                    </button>
                    {isDisabled && !isSubmitting && (
                        <p className="text-center text-red-500 text-[13px] mt-2 font-medium">
                            Vui lòng thêm địa chỉ giao hàng
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
