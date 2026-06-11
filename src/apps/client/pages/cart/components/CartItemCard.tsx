import { memo } from "react";
import type { CartItemModel } from "../../../features/cart/model/cart.model";
import { useCartItemCardController } from "../componentControllers/useCartItemCard.controller";

interface CartItemCardProps {
    item: CartItemModel;
    onUpdateQuantity: (variantId: number, newQty: number) => void;
    onDelete: (variantId: number) => void;
    formatPrice: (price: number) => string;
}

export const CartItemCard = memo(({ item, onUpdateQuantity, onDelete, formatPrice }: CartItemCardProps) => {
    const targetId = item.variant?.id || item.product.id;
    const price = item.variant?.price || 0;
    const originalPrice = item.variant?.originalPrice;
    const stockQuantity = item.variant?.stockQuantity ?? 0;

    const controller = useCartItemCardController(item, onUpdateQuantity);

    return (
        <div className="flex gap-4 p-4 sm:p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 group">
            {/* Image */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-blue-100 transition-colors">
                <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover mix-blend-multiply"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/150x150?text=No+Image";
                    }}
                />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between py-0.5">
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1.5">
                        <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-800 leading-snug line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                            {item.product.name}
                        </h3>
                        {item.variant && item.variant.attributes && (
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {Object.entries(item.variant.attributes).map(([key, value]) => (
                                    <span key={key} className="inline-flex items-center px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 text-[12px] font-medium rounded-md">
                                        <span className="text-slate-400 mr-1">{key}:</span> {value}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        <div className="pt-0.5">
                            {stockQuantity > 10 && (
                                <span className="inline-flex items-center gap-1 text-[12px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                    <span className="material-icons-outlined text-[14px]">check_circle</span>
                                    Còn hàng
                                </span>
                            )}
                            {stockQuantity > 0 && stockQuantity <= 10 && (
                                <span className="inline-flex items-center gap-1 text-[12px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                                    <span className="material-icons-outlined text-[14px]">warning_amber</span>
                                    Chỉ còn {stockQuantity} sản phẩm
                                </span>
                            )}
                            {stockQuantity === 0 && (
                                <span className="inline-flex items-center gap-1 text-[12px] font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                                    <span className="material-icons-outlined text-[14px]">cancel</span>
                                    Hết hàng
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => onDelete(targetId)}
                        className="w-8 h-8 cursor-pointer flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                        title="Xóa sản phẩm"
                    >
                        <span className="material-icons-outlined text-[20px]">
                            delete_outline
                        </span>
                    </button>
                </div>

                <div className="flex items-end justify-between mt-3 sm:mt-4">
                    {/* Price */}
                    <div>
                        <p className="text-[16px] sm:text-[17px] font-bold text-blue-600">
                            {formatPrice(price)}
                        </p>
                        {originalPrice && originalPrice > price && (
                            <p className="text-[12px] sm:text-[13px] text-slate-400 line-through mt-0.5">
                                {formatPrice(originalPrice)}
                            </p>
                        )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm">
                        <button
                            onClick={controller.handleDecrease}
                            disabled={controller.isDecreaseDisabled}
                            className="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <span className="material-icons-outlined text-[16px]">remove</span>
                        </button>

                        <input
                            type="text"
                            value={controller.inputValue}
                            onChange={controller.handleInputChange}
                            onBlur={controller.handleBlur}
                            onKeyDown={controller.handleKeyDown}
                            className="w-8 sm:w-10 text-center text-[13px] sm:text-[14px] font-semibold text-slate-700 bg-transparent outline-none focus:bg-slate-50 rounded-md"
                        />

                        <button
                            onClick={controller.handleIncrease}
                            disabled={controller.isIncreaseDisabled}
                            className="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <span className="material-icons-outlined text-[16px]">add</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});
