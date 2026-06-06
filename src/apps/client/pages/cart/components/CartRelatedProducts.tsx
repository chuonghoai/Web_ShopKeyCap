import { memo } from "react";
import { useCartRelatedProductsController } from "../componentControllers/cartRelatedProducts.controller";
import type { ProductItem } from "../../../features/products/model/product.model";
import ProductCard from "../../homepage/components/ProductCard";

interface CartRelatedProductsProps {
    products: ProductItem[];
}

export const CartRelatedProducts = memo(({ products }: CartRelatedProductsProps) => {
    const { currentIndex, itemsPerView, handleNext, handlePrev } = useCartRelatedProductsController(products);

    if (products.length === 0) return null;

    return (
        <div className="mt-12 mb-8 relative">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[20px] font-bold text-slate-900 flex items-center gap-2">
                    <span className="material-icons-outlined text-blue-600">recommend</span>
                    Có thể bạn cần thêm
                </h2>

                {products.length > itemsPerView && (
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrev}
                            className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors"
                        >
                            <span className="material-icons-outlined text-[20px]">chevron_left</span>
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors"
                        >
                            <span className="material-icons-outlined text-[20px]">chevron_right</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="overflow-hidden -mx-2 md:-mx-3">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                >
                    {products.map(product => (
                        <div
                            key={product.id}
                            className="shrink-0 px-2 md:px-3"
                            style={{ width: `${100 / itemsPerView}%` }}
                        >
                            <ProductCard data={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});
