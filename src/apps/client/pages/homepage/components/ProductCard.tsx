import { Link } from 'react-router-dom';
import type { ProductItem } from '../../../features/products/model/product.model';

export const ProductCard = ({ data }: { data: ProductItem }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="group relative flex flex-col bg-slate-900 rounded-2xl border border-slate-800 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]">

            {/* Badge*/}
            {data.percentDiscount > 0 && (
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-red-500/20 text-red-400 text-[13px] font-semibold rounded-md border border-red-500/30 backdrop-blur-sm">
                    -{data.percentDiscount}%
                </div>
            )}

            {/* Image Box */}
            <Link to={`/product/${data.slug}`} className="block w-full h-48 bg-slate-950/50 rounded-xl overflow-hidden mb-4 relative items-center justify-center">
                <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="w-4/5 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
                />
            </Link>

            {/* Info */}
            <div className="flex flex-col flex-1 space-y-2">
                <Link to={`/product/${data.slug}`}>
                    <h3 className="text-[16px] font-semibold text-slate-200 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {data.name}
                    </h3>
                </Link>

                <div className="flex items-end gap-2 mt-auto pt-2">
                    <span className="text-[18px] font-bold text-white">
                        {formatPrice(data.price)}
                    </span>
                    {(data.originalPrice > data.price) && (
                        <span className="text-[14px] font-medium text-slate-500 line-through mb-0.5">
                            {formatPrice(data.originalPrice)}
                        </span>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-[14px] font-semibold py-2.5 rounded-lg shadow-md shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                    <span className="material-icons-outlined text-[18px]">add_shopping_cart</span>
                    Thêm
                </button>
                <button className={`w-11 py-2.5 rounded-lg flex items-center justify-center transition-colors ${data.isFavorite ? 'bg-red-500/20 text-red-500' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                    <span className="material-icons-outlined text-[18px]">
                        {data.isFavorite ? 'favorite' : 'favorite_border'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;