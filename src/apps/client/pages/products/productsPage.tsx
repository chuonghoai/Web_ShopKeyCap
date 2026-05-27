import HeroSection from "../homepage/components/HeroSection";
import ProductCard from "../homepage/components/ProductCard";
import { useProductsController } from "./products.controller";

const MOCK_TYPES = [
    { name: "Bàn phím", slug: "ban-phim" },
    { name: "Switch", slug: "switch" },
    { name: "Keycap", slug: "keycap" },
    { name: "Phụ kiện", slug: "phu-kien" }
];

const MOCK_BRANDS = [
    { name: "Akko", slug: "akko" },
    { name: "Evoworks", slug: "evoworks" },
    { name: "Lofree", slug: "lofree" },
    { name: "Piifox", slug: "piifox" },
    { name: "Yunzii", slug: "yunzii" }
];

export const ProductsPage = () => {
    const controller = useProductsController();

    return (
        <div className="w-full pb-20 pt-8">
            {/* Banner Top */}
            <div className="mb-8">
                <HeroSection />
            </div>
            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Filter Sidebar */}
                <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6 sticky top-24">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-icons-outlined text-slate-800 text-[24px]">filter_alt</span>
                        <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">Bộ Lọc</h2>
                    </div>

                    {/* In stock */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 text-[15px] uppercase tracking-wide">Trạng Thái</h3>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={controller.currentInStock}
                                onChange={controller.handleInStockChange}
                                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-[15px] font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                                Hàng có sẵn
                            </span>
                        </label>
                    </div>

                    {/* Categories */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 text-[15px] uppercase tracking-wide">Danh mục</h3>
                        <div className="flex flex-col gap-3.5">
                            {MOCK_TYPES.map(type => (
                                <label key={type.slug} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="typeFilter"
                                        checked={controller.currentType === type.slug}
                                        onChange={() => controller.handleTypeChange(type.slug)}
                                        className="w-5 h-5 border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-[15px] font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                                        {type.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Products type */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 text-[15px] uppercase tracking-wide">Loại sản phẩm</h3>
                        <div className="flex flex-col gap-3.5">
                            {MOCK_TYPES.map(type => (
                                <label key={type.slug} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="typeFilter"
                                        checked={controller.currentType === type.slug}
                                        onChange={() => controller.handleTypeChange(type.slug)}
                                        className="w-5 h-5 border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-[15px] font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                                        {type.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* brands */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 text-[15px] uppercase tracking-wide">Thương Hiệu</h3>
                        <div className="flex flex-col gap-3.5">
                            {MOCK_BRANDS.map(brand => (
                                <label key={brand.slug} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={controller.currentBrands.includes(brand.slug)}
                                        onChange={() => controller.handleBrandChange(brand.slug)}
                                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-[15px] font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                                        {brand.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main */}
                <div className="flex-1 w-full min-w-0">

                    {/* Header + Sort Option */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h1 className="text-[26px] md:text-[28px] font-bold text-slate-900 flex items-center gap-3">
                            <span className="w-1.5 h-7 bg-blue-500 rounded-full inline-block"></span>
                            Tất Cả Sản Phẩm
                        </h1>

                        <div className="flex items-center gap-3 bg-white p-1.5 pl-4 rounded-xl border border-slate-200 shadow-sm">
                            <span className="text-[14px] text-slate-500 font-medium whitespace-nowrap">Sắp xếp:</span>
                            <select
                                value={controller.currentSort}
                                onChange={controller.handleSortChange}
                                className="h-9 px-2 bg-transparent text-[15px] font-semibold text-slate-700 focus:outline-none cursor-pointer"
                            >
                                <option value="">Mặc định</option>
                                <option value="A_Z">Tên: A - Z</option>
                                <option value="Z_A">Tên: Z - A</option>
                                <option value="NEWEST">Hàng mới nhất</option>
                                <option value="PRICE_ASC">Giá: Tăng dần</option>
                                <option value="PRICE_DESC">Giá: Giảm dần</option>
                            </select>
                        </div>
                    </div>

                    {/* Products */}
                    {controller.isLoading ? (
                        <div className="w-full flex justify-center items-center py-32 bg-white rounded-3xl border border-slate-200 shadow-sm">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                            <span className="ml-3 text-slate-500 font-medium">Đang tải dữ liệu...</span>
                        </div>
                    ) : (
                        <>
                            {controller.products.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                                    {controller.products.map((product) => (
                                        <div key={product.id}>
                                            <ProductCard data={product} isNew={false} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="w-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                                    <span className="material-icons-outlined text-6xl mb-4 text-slate-300">inventory_2</span>
                                    <p className="text-lg text-slate-500 font-medium">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
                                </div>
                            )}

                            {controller.totalPages > 1 && (
                                <div className="mt-12 flex justify-center items-center gap-4">
                                    <button
                                        onClick={() => controller.handlePageChange(controller.currentPage - 1)}
                                        disabled={controller.currentPage === 1}
                                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                    >
                                        <span className="material-icons-outlined text-[20px]">arrow_back_ios_new</span>
                                    </button>

                                    <span className="text-[15px] font-medium text-slate-700">
                                        Trang {controller.currentPage} / {controller.totalPages}
                                    </span>

                                    <button
                                        onClick={() => controller.handlePageChange(controller.currentPage + 1)}
                                        disabled={controller.currentPage === controller.totalPages}
                                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                    >
                                        <span className="material-icons-outlined text-[20px]">arrow_forward_ios</span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;