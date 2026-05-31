import { ShoppingCart } from "lucide-react";
import type { ProductItem } from "../../../features/products/model/product.model";
import { useProductCardController } from "../cpnController/productCard.controller";

interface ProductCardProps {
    data: ProductItem & { typeName?: string };
    isNew?: boolean;
}

export const ProductCard = ({ data, isNew = true }: ProductCardProps) => {
    const controller = useProductCardController(data);

    return (
        <div
            onClick={controller.handleCardClick}
            className="group relative cursor-pointer h-full"
        >
            {/* tooltip */}
            <div className="
                absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-9999
                w-max max-w-55 rounded-lg bg-slate-900 px-3 py-2 text-[13px] font-medium text-white shadow-lg
                opacity-0 invisible translate-y-2
                transition-all duration-200
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                group-has-[button:hover]:opacity-0 group-has-[button:hover]:invisible
                pointer-events-none text-center
            ">
                <span className="line-clamp-2 whitespace-normal leading-snug">
                    {data.name}
                </span>

                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-slate-900 rotate-45"></div>
            </div>

            <div className="
                relative
                flex flex-col
                h-full
                overflow-hidden
                rounded-[28px]
                bg-white
                shadow-sm
                border border-slate-200
                transition-all duration-300
                group-hover:-translate-y-1
                group-hover:shadow-xl
            ">
                {/* Image */}
                <div className="relative z-10 overflow-hidden bg-black aspect-4/3 w-full shrink-0">
                    <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80 z-1" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-orange-300/40 blur-3xl z-1" />

                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                        {isNew && (
                            <div className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold tracking-wide shadow-md">
                                NEW
                            </div>
                        )}
                    </div>

                    <div className="relative z-2 flex items-center justify-center w-full h-full">
                        <img
                            src={data.imageUrl}
                            alt={data.name}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                        <h3 className="
                            text-[18px] lg:text-[20px]
                            font-bold
                            text-slate-800
                            leading-tight
                            line-clamp-2
                            transition-colors
                            group-hover:text-blue-600
                        ">
                            {data.name}
                        </h3>

                        {data.typeName && (
                            <div className="
                                mt-2.5
                                flex items-center gap-2
                                text-[11px]
                                uppercase
                                tracking-[0.35em]
                                text-slate-400
                                font-medium
                            ">
                                <span className="flex-1 h-px bg-slate-200" />
                                {data.typeName.toUpperCase()}
                                <span className="flex-1 h-px bg-slate-200" />
                            </div>
                        )}
                    </div>

                    {/* Giá - Nút thêm vào giỏ hàng */}
                    <div className="relative h-12 overflow-hidden w-full">

                        {/* Giá tiền */}
                        <div className="absolute inset-0 flex items-center gap-2 transition-all duration-300 transform group-hover:-translate-y-full group-hover:opacity-0">
                            <span className="
                                text-[22px] lg:text-[26px]
                                font-extrabold
                                tracking-tight
                                text-blue-700
                                leading-none
                            ">
                                {controller.formatPrice(data.minPrice)}
                            </span>
                        </div>

                        {/* Nút giỏ hàng */}
                        <button
                            onClick={controller.handleAddToCart}
                            disabled={controller.isAdding}
                            className={`
                                absolute inset-0 w-full h-full
                                rounded-xl
                                text-white
                                text-[14px] lg:text-[15px] font-semibold
                                flex items-center justify-center gap-2.5
                                shadow-lg shadow-blue-500/20
                                transition-all duration-300
                                translate-y-full opacity-0
                                group-hover:translate-y-0 group-hover:opacity-100
                                cursor-pointer
                                ${controller.isAdding
                                    ? "bg-slate-500 opacity-90 cursor-not-allowed group-hover:translate-y-0"
                                    : "bg-linear-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                                }
                            `}
                        >
                            {controller.isAdding ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <ShoppingCart size={18} />
                                    Thêm vào giỏ
                                </>
                            )}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;