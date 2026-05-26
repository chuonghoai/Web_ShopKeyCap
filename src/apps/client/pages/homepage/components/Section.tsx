import type { ProductItem } from '../../../features/products/model/product.model';
import { useSectionController } from '../cpnController/section.controller';
import ProductCard from './ProductCard';

interface SectionProps {
    sectionName: string;
    items: ProductItem[];
    onViewAll: () => void;
    id?: string;
}

export const Section = ({ sectionName, items, onViewAll, id }: SectionProps) => {
    const controller = useSectionController(items?.length || 0);

    if (!items || items.length === 0) return null;

    const hasEnoughItems = items.length > 5;

    return (
        <section id={id} className="mt-16 first-of-type:mt-8 scroll-mt-32 w-full">

            {/* Header Section */}
            <div className="relative z-10 flex items-center justify-between mb-6">
                <h2 className="text-[26px] font-bold text-slate-900 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                    {sectionName}
                </h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={controller.handlePrev}
                        disabled={!hasEnoughItems}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${hasEnoughItems
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer'
                            : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                            }`}
                    >
                        <span className="material-icons-outlined text-[20px]">arrow_back_ios_new</span>
                    </button>
                    <button
                        onClick={controller.handleNext}
                        disabled={!hasEnoughItems}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${hasEnoughItems
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer'
                            : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                            }`}
                    >
                        <span className="material-icons-outlined text-[20px]">arrow_forward_ios</span>
                    </button>
                </div>
            </div>

             <div
                ref={controller.trackRef}
                className="flex overflow-x-hidden gap-4 lg:gap-6 pb-4 pt-18 -mt-17 w-full relative z-20 pr-2 pointer-events-none"
            >
                {items.map((product) => (
                    <div
                        key={product.id}
                        className="shrink-0 w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)] xl:w-[calc((100%-96px)/5)] pointer-events-auto"
                    >
                        <ProductCard data={product} isNew={sectionName === "Hàng Mới Cập Bến"} />
                    </div>
                ))}
            </div>

            <div className="mt-2 flex justify-center relative z-10">
                <button
                    onClick={onViewAll}
                    className="
                        px-8 py-3.5
                        rounded-xl
                        text-[15px] font-bold tracking-wide
                        text-blue-600 bg-blue-50/50
                        border border-blue-100
                        transition-all duration-300
                        hover:text-white
                        hover:border-transparent
                        hover:bg-linear-to-r hover:from-blue-500 hover:to-cyan-500
                        hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)]
                        hover:-translate-y-0.5
                        cursor-pointer
                    "
                >
                    XEM TẤT CẢ {sectionName.toUpperCase()}
                </button>
            </div>
        </section>
    );
};

export default Section;