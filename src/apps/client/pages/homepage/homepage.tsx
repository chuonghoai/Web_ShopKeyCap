import ProductCard from "./components/ProductCard";

export const HomePage = () => {
    const mockProducts = [
        { id: '1', name: 'CyberBoard R3', price: '9,500,000đ', image: 'https://tse3.mm.bing.net/th/id/OIP.QjIBrvAWKITAkoO2kmIKqgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', badge: 'New' },
        { id: '2', name: 'Keychron Q1 Pro', price: '4,200,000đ', image: 'https://cdn.shopify.com/s/files/1/0059/0630/1017/t/5/assets/keychronq1pro4-1673855880953.jpg?v=1673855883' },
        { id: '3', name: 'Tofu65 2.0', price: '3,800,000đ', image: 'https://tse1.mm.bing.net/th/id/OIP.uvrHGMa2ZCB_knf55yyT6QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', badge: 'Hot' },
        { id: '4', name: 'Zoom75 EE', price: '5,100,000đ', image: 'https://ucarecdn.com/e8e0dce8-1947-4fa0-8201-479412e48fc7/-/format/auto/-/preview/3000x3000/-/quality/lighter/Zoom75_EEWhite_eWhite.jpg' },
    ];

    return (
        <div className="w-full space-y-12">
            {/* Hero section */}
            <section className="relative w-full h-112.5 rounded-2xl bg-linear-to-r from-slate-900 to-slate-800 border border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden flex items-center px-10 md:px-16">
                <div className="absolute inset-0 bg-[url('/assets/triangle_hollow.png')] bg-cover opacity-10 pointer-events-none mix-blend-overlay"></div>

                <div className="relative z-10 w-1/2 space-y-6">
                    <h1 className="text-[36px] md:text-[48px] font-bold text-white leading-tight">
                        Nâng Tầm Trải Nghiệm <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">Gõ Phím Của Bạn</span>
                    </h1>
                    <p className="text-[16px] text-slate-300 font-medium max-w-md">
                        Khám phá bộ sưu tập bàn phím cơ custom đỉnh cao, switch mượt mà và keycap độc đáo nhất tại Cyber Keys.
                    </p>
                    <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md shadow-blue-500/30 transition-all transform hover:-translate-y-0.5">
                        Khám Phá Ngay
                    </button>
                </div>

                <div className="relative z-10 w-1/2 flex justify-end">
                    <img src="/assets/keyboard.png" alt="Featured Keyboard" className="w-[120%] max-w-none transform -rotate-12 hover:rotate-0 hover:scale-105 transition-transform duration-700 drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)]" />
                </div>
            </section>

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
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockProducts.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};