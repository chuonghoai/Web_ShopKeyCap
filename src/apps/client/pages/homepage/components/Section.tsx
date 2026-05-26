// homepage/components/Section.tsx
import type { ProductItem } from '../../../features/products/model/product.model';
import ProductCard from './ProductCard';

interface SectionProps {
    sectionName: string;
    items: ProductItem[];
    /**
     * Callback khi người dùng bấm "Xem tất cả".
     * Logic điều hướng được xử lý bởi Controller — Section chỉ gọi callback này.
     */
    onViewAll: () => void;
    id?: string;
}

export const Section = ({ sectionName, items, onViewAll, id }: SectionProps) => {
    if (!items || items.length === 0) return null;

    return (
        <section id={id} className="mt-16 first-of-type:mt-8 scroll-mt-32 w-full">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
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

            {/* Container cuộn ngang: 
                - overflow-x-auto: cho phép cuộn ngang
                - snap-x snap-mandatory: tạo cảm giác khựng lại từng card khi lướt (rất tốt trên mobile)
                - [scrollbar-width:none]: Ẩn thanh cuộn xấu xí trên Firefox
                - [&::-webkit-scrollbar]:hidden: Ẩn thanh cuộn trên Chrome/Safari
            */}
            <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.map((product) => (
                    // Cố định chiều rộng của mỗi card khi lướt ngang
                    <div key={product.id} className="snap-start shrink-0 w-[260px] sm:w-[280px]">
                        <ProductCard data={product} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Section;