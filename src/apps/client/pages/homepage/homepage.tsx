import HeroSection from "./components/HeroSection";
import ProductCard from "./components/ProductCard";
import { useHomepageController } from "./homepage.controller";

export const HomePage = () => {
    const controller = useHomepageController();

    return (
        <div className="w-full space-y-12">
            {/* Hero section */}
            <HeroSection />

            {/* Filter bar */}
            <section className="flex flex-col md:flex-row justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800 gap-4">
                <div className="flex gap-2 items-center w-full md:w-auto">
                    <button className="px-3.5 py-2 text-[14px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors">Tất cả</button>
                    <button className="px-3.5 py-2 text-[14px] font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">Custom Kit</button>
                    <button className="px-3.5 py-2 text-[14px] font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">Switches</button>
                    <button className="px-3.5 py-2 text-[14px] font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">Keycaps</button>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <select className="px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-[14px] text-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-full md:w-48">
                        <option>Mới nhất</option>
                        <option>Giá tăng dần</option>
                        <option>Giá giảm dần</option>
                    </select>
                </div>
            </section>

            {/* Product grid */}
            <section id="product-list" className="scroll-mt-32">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {controller.items.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};