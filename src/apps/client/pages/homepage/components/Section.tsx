import type { ProductItem } from '../../../features/products/model/product.model';
import ProductCard from './ProductCard';

interface SectionProps {
    sectionName: string;
    items: ProductItem[];
    onViewAll: () => void;
    id?: string;
}

export const Section = ({ sectionName, items, onViewAll, id }: SectionProps) => {
    if (!items || items.length === 0) return null;

    return (
        <section id={id} className="mt-16 first-of-type:mt-8 scroll-mt-32 w-full">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                    {sectionName}
                </h2>
                <button
                    onClick={onViewAll}
                    className="text-[14px] text-blue-400 hover:text-blue-300 font-medium transition-colors whitespace-nowrap"
                >
                    Xem tất cả &rarr;
                </button>
            </div>

            <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden">
                {items.map((product) => (
                    <div key={product.id} className="snap-start shrink-0 w-65 sm:w-70">
                        <ProductCard data={product} isNew={sectionName === "Hàng Mới Cập Bến"} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Section;