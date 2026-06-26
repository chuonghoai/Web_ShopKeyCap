import React from 'react';
import type { PrepareCheckoutModel } from '../../../features/order/models/prepareCheckout.model';

interface ProductListSectionProps {
    items: PrepareCheckoutModel['items'];
    isLoading: boolean;
    formatPrice: (price: number) => string;
}

export const ProductListSection: React.FC<ProductListSectionProps> = ({ items, isLoading, formatPrice }) => {
    if (isLoading) {
        return (
            <div className="py-6 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/4 mb-6"></div>
                <div className="space-y-4">
                    {[1, 2].map(i => (
                        <div key={i} className="flex gap-4 border-b border-slate-100 pb-4 last:border-0">
                            <div className="w-20 h-20 bg-slate-200 rounded-xl"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
                                <div className="h-4 bg-slate-200 rounded w-1/4 mt-4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="py-6">
            <div className="mb-4">
                <h2 className="text-[18px] font-bold text-slate-900 flex items-center gap-2">
                    <span className="material-icons-outlined text-blue-600">inventory_2</span>
                    Sản phẩm ({items.length})
                </h2>
            </div>
            
            <div className="">
                <div className="hidden md:grid grid-cols-12 gap-4 py-3 border-b border-slate-200 text-[14px] text-slate-400">
                    <div className="col-span-6">Sản phẩm</div>
                    <div className="col-span-2 text-center">Đơn giá</div>
                    <div className="col-span-2 text-center">Số lượng</div>
                    <div className="col-span-2 text-right">Thành tiền</div>
                </div>

                <div className="divide-y divide-slate-100">
                    {items.map((item, index) => (
                        <div key={`${item.product.id}-${index}`} className="py-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                            {/* Product Info */}
                            <div className="col-span-6 flex gap-4 w-full">
                                <div className="w-20 h-20 shrink-0 bg-white rounded-xl border border-slate-100 p-2 relative overflow-hidden group">
                                    <img 
                                        src={item.product.imageUrl} 
                                        alt={item.product.name} 
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                                    />
                                </div>
                                <div className="flex flex-col justify-center flex-1 min-w-0">
                                    <h3 className="text-[15px] font-semibold text-slate-900 mb-1.5 truncate">
                                        {item.product.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {Object.entries(item.product.attributes).map(([key, val]) => (
                                            <span 
                                                key={key} 
                                                className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[12px] font-medium rounded-md whitespace-nowrap"
                                            >
                                                <span className="text-slate-400 mr-1">{key}:</span> {val}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="col-span-2 text-center w-full md:w-auto flex justify-between md:block">
                                <span className="md:hidden text-slate-500 text-sm">Đơn giá:</span>
                                <div>
                                    <div className="text-[15px] font-bold text-slate-900">
                                        {formatPrice(item.product.price)}
                                    </div>
                                    {item.product.discountPercentage > 0 && (
                                        <div className="text-[12px] text-slate-400 line-through mt-0.5">
                                            {formatPrice(item.product.originalPrice)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="col-span-2 text-center w-full md:w-auto flex justify-between md:block">
                                <span className="md:hidden text-slate-500 text-sm">Số lượng:</span>
                                <span className="text-[15px] font-medium text-slate-700">
                                    {item.quantity}
                                </span>
                            </div>

                            {/* Amount */}
                            <div className="col-span-2 text-right w-full md:w-auto flex justify-between md:block">
                                <span className="md:hidden text-slate-500 text-sm">Thành tiền:</span>
                                <span className="text-[15px] font-bold text-blue-600">
                                    {formatPrice(item.amount)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
