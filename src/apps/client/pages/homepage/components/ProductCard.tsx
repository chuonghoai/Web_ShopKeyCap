import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { MouseEvent } from "react";
import type { ProductItem } from "../../../features/products/model/product.model";

interface ProductCardProps {
    data: ProductItem;
    isNew?: boolean;
}

export const ProductCard = ({ data, isNew = true, }: ProductCardProps) => {
    const navigate = useNavigate();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "₫";
    };

    let discountText = "";
    if (data.percentDiscount > 0) {
        discountText = `-${data.percentDiscount}%`;
    } else if (data.originalPrice > data.price) {
        discountText = `-${formatPrice(data.originalPrice - data.price)}`;
    }

    /**
     * Chuyển trang khi click vào card
     */
    const handleCardClick = () => {
        navigate(`/product/${data.slug}`);
    };

    /**
     * Ngăn chặn chuyển trang khi click vào nút bấm
     */
    const handleActionClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    };

    return (
        <div
            onClick={handleCardClick}
            className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                bg-white
                shadow-sm
                border border-slate-200
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl
                cursor-pointer
            "
        >
            {/* Image */}
            <div className="relative overflow-hidden bg-black aspect-4/3 w-full">

                <div className=" absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80 z-1 "/>
                <div className=" absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-orange-300/40 blur-3xl z-1 "/>

                <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                    {discountText && (
                        <div className=" px-3 py-1 rounded-full bg-red-500 text-white text-[11px] font-bold tracking-wide shadow-md">
                            {discountText}
                        </div>
                    )}
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
            <div className="p-5 flex flex-col justify-between">

                <div>
                    <h3
                        className="
                            text-[22px]
                            font-bold
                            text-slate-800
                            leading-tight
                            line-clamp-2
                            transition-colors
                            group-hover:text-blue-600
                        "
                    >
                        {data.name}
                    </h3>

                    {data.typeName && (
                        <div
                            className="
                                mt-2.5
                                flex items-center gap-2
                                text-[11px]
                                uppercase
                                tracking-[0.35em]
                                text-slate-400
                                font-medium
                            "
                        >
                            <span className="flex-1 h-px bg-slate-200" />
                            {data.typeName.toUpperCase()}
                            <span className="flex-1 h-px bg-slate-200" />
                        </div>
                    )}

                    <div className="mt-3 flex items-end gap-2 flex-wrap">
                        <span
                            className="
                                text-[28px]
                                font-extrabold
                                tracking-tight
                                text-blue-700
                            "
                        >
                            {formatPrice(data.price)}
                        </span>
                        {data.originalPrice > data.price && (
                            <span className="text-[14px] text-slate-400 line-through mb-1.5 font-medium">
                                {formatPrice(data.originalPrice)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                    <button
                        onClick={handleActionClick}
                        className="
                            flex-1
                            h-12
                            rounded-xl
                            bg-linear-to-r
                            from-blue-500
                            to-blue-700
                            text-white
                            text-[15px]
                            font-semibold
                            flex items-center justify-center gap-2.5
                            shadow-lg shadow-blue-500/20
                            transition-all duration-300
                            hover:scale-[1.02]
                            hover:shadow-blue-500/40
                            active:scale-[0.99]
                        "
                    >
                        <ShoppingCart size={18} />
                        Thêm vào giỏ
                    </button>

                    <button
                        onClick={handleActionClick}
                        className={`
                            shrink-0
                            w-12 h-12
                            rounded-xl
                            flex items-center justify-center
                            border
                            transition-all duration-300
                            hover:scale-105 active:scale-95
                            ${data.isFavorite
                                ? 'bg-red-50 border-red-100 shadow-sm shadow-red-500/10'
                                : 'bg-slate-50 border-slate-200 shadow-sm hover:bg-slate-100'
                            }
                        `}
                    >
                        <Heart
                            size={20}
                            className={data.isFavorite ? "fill-red-500 text-red-500" : "text-slate-400"}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;