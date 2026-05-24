import { Link } from 'react-router-dom';

interface ProductData {
    id: string;
    name: string;
    price: string;
    image: string;
    badge?: string;
}

export const ProductCard = ({ data }: { data: ProductData }) => {
    return (
        <div className="group relative flex flex-col bg-slate-900 rounded-2xl border border-slate-800 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]">

            {/* Badge (Nếu có) */}
            {data.badge && (
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-blue-500/20 text-blue-400 text-[13px] font-semibold rounded-md border border-blue-500/30 backdrop-blur-sm">
                    {data.badge}
                </div>
            )}

            {/* Image Box */}
            <Link to={`/product/${data.id}`} className="block w-full h-48 bg-slate-950/50 rounded-xl overflow-hidden mb-4 relative items-center justify-center">
                <img
                    src={data.image}
                    alt={data.name}
                    className="w-4/5 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
                />
            </Link>

            {/* Info */}
            <div className="flex flex-col flex-1 space-y-2">
                <Link to={`/product/${data.id}`}>
                    <h3 className="text-[16px] font-semibold text-slate-200 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {data.name}
                    </h3>
                </Link>
                <div className="text-[18px] font-bold text-white mt-auto pt-2">
                    {data.price}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-[14px] font-semibold py-2.5 rounded-lg shadow-md shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                    <span className="material-icons-outlined text-[18px]">add_shopping_cart</span>
                    Thêm
                </button>
                <button className="w-11 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-lg flex items-center justify-center transition-colors">
                    <span className="material-icons-outlined text-[18px]">favorite_border</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;