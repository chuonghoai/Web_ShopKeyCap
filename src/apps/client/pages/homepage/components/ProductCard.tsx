import type { ProductItem } from "../../../features/products/model/product.model";
import { useProductCardController } from "../cpnController/productCard.controller";

interface ProductCardProps {
    data: ProductItem;
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
                absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-9999
                w-max max-w-55 rounded-sm bg-slate-800 px-2 py-1 text-[12px] text-white
                opacity-0 invisible
                transition-opacity duration-200
                group-hover:opacity-100 group-hover:visible
                group-has-[button:hover]:opacity-0 group-has-[button:hover]:invisible
                pointer-events-none text-center
            ">
                <span className="line-clamp-2 whitespace-normal leading-tight">
                    {data.name}
                </span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
            </div>

            <div className="
                relative
                flex flex-col
                h-full
                overflow-hidden
                rounded-md
                bg-white
                border border-slate-200
                transition-all duration-300
                group-hover:border-blue-500
                group-hover:-translate-y-1
                group-hover:shadow-lg
            ">
                {/* Image */}
                <div className="relative z-10 overflow-hidden bg-slate-100 aspect-4/3 w-full shrink-0 border-b border-slate-100">
                    <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
                        {isNew && (
                            <div className="px-2 py-0.5 rounded-sm bg-blue-600 text-white text-[11px] font-bold tracking-wide">
                                NEW
                            </div>
                        )}
                    </div>

                    <div className="relative z-2 flex items-center justify-center w-full h-full">
                        <img
                            src={data.imageUrl}
                            alt={data.name}
                            className="object-cover w-full h-full"
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

                        {data.category?.name && (
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
                                {data.category?.name.toUpperCase()}
                                <span className="flex-1 h-px bg-slate-200" />
                            </div>
                        )}
                    </div>

                    {/* Giá - Nút Xem chi tiết */}
                    <div className="relative h-10 overflow-hidden w-full mt-2">
                        {/* Giá tiền */}
                        <div className="absolute inset-0 flex items-center gap-2 transition-all duration-300 transform group-hover:-translate-y-full group-hover:opacity-0">
                            <span className="text-[18px] font-bold text-slate-900 leading-none">
                                {controller.formatPrice(data.minPrice)}
                            </span>
                        </div>

                        {/* Nút Xem chi tiết */}
                        <button
                            onClick={controller.handleCardClick}
                            className="
                                absolute inset-0 w-full h-full
                                rounded-md
                                text-white
                                text-[13px] font-medium
                                flex items-center justify-center
                                transition-all duration-300
                                translate-y-full opacity-0
                                group-hover:translate-y-0 group-hover:opacity-100
                                cursor-pointer
                                bg-blue-600 hover:bg-blue-700
                            "
                        >
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;