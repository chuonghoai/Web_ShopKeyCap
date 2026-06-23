import React from "react";
import type { OrderModel } from "../../../../features/order/models/order.model";
import type { AvailableReview } from "../../../../features/review";
import { formatCurrency } from "../../../../../../utils/currency.util";

interface ProductListSidebarProps {
    order: OrderModel;
    availableReviews: AvailableReview[];
    selectedProductId: number | null;
    onSelectProduct: (productId: number) => void;
}

export const ProductListSidebar: React.FC<ProductListSidebarProps> = ({
    order,
    availableReviews,
    selectedProductId,
    onSelectProduct
}) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-full max-h-150">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h2 className="font-bold text-slate-900">Sản phẩm trong đơn</h2>
                <p className="text-xs text-slate-500 mt-1">Chọn sản phẩm để đánh giá</p>
            </div>
            <div className="overflow-y-auto flex-1 p-2 space-y-2">
                {order.items.map((item) => {
                    const isReviewed = availableReviews.some(r => r.productId === item.productId);
                    const isSelected = selectedProductId === item.productId;

                    return (
                        <div 
                            key={item.id}
                            onClick={() => onSelectProduct(item.productId)}
                            className={`p-3 rounded-xl border cursor-pointer transition-all ${
                                isSelected 
                                ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                                : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex gap-3">
                                <div className="w-16 h-16 shrink-0 bg-white rounded-lg border border-slate-200 overflow-hidden">
                                    <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col">
                                    <h4 className="text-sm font-medium text-slate-900 truncate">{item.productName}</h4>
                                    <div className="text-xs text-slate-500 mt-0.5 truncate">
                                        {item.attributes.map(a => `${a.name}: ${a.value}`).join(' • ')}
                                    </div>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-sm font-semibold text-slate-900">{formatCurrency(item.price)}</span>
                                        {isReviewed ? (
                                            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                                                Đã đánh giá
                                            </span>
                                        ) : (
                                            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                                                Chưa đánh giá
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
