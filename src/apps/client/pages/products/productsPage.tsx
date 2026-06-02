import { SORT_OPTIONS } from "../../features/products/model/filter.model";
import HeroSection from "../homepage/components/HeroSection";
import ProductCard from "../homepage/components/ProductCard";
import { PRICE_RANGES } from "./models/priceFilter.type";
import { useProductsController } from "./products.controller";

export const ProductsPage = () => {
    const controller = useProductsController();

    return (
        <div className="w-full ">
            {/* Banner Top */}
            <div className="mb-8">
                <HeroSection />
            </div>
            <div id="product-list" className="flex flex-col lg:flex-row gap-6 items-start">

                {/* Filter Sidebar */}
                <div className="w-full lg:w-70 shrink-0 top-24 self-start">
                    <div className="bg-white p-6 rounded-md border border-slate-200 flex flex-col gap-4 min-h-[calc(100vh-7rem)] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <div className="flex items-center gap-2">
                                <span className="material-icons-outlined text-slate-800 text-[24px]">filter_alt</span>
                                <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">Bộ Lọc</h2>
                            </div>

                            {controller.hasActiveFilter && (
                                <button
                                    onClick={controller.handleResetFilter}
                                    className="flex items-center gap-1 text-[14px] font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                >
                                    <span className="material-icons-outlined text-[18px]">replay</span>
                                    Xóa tất cả
                                </button>
                            )}
                        </div>

                        {/* In stock */}
                        <div>
                            <h3 className="font-bold text-slate-800 mb-4 text-[15px] uppercase tracking-wide">Trạng Thái</h3>
                            <label className="flex items-center gap-3 cursor-pointer group w-fit">
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

                        {/* Mức giá */}
                        <div>
                            <h3 className="font-bold text-slate-800 mb-4 text-[15px] uppercase tracking-wide">Mức Giá</h3>
                            <div className="flex flex-col gap-3.5">
                                {PRICE_RANGES.map(range => (
                                    <label key={range.value} className="flex items-center gap-3 cursor-pointer group w-fit">
                                        <input
                                            type="radio"
                                            name="priceFilter"
                                            checked={controller.currentPriceValue === range.value}
                                            onChange={() => controller.handlePriceChange(range.min, range.max)}
                                            className="w-5 h-5 border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        />
                                        <span className="text-[15px] font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                                            {range.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="font-bold text-slate-800 mb-4 text-[15px] uppercase tracking-wide">Danh mục</h3>
                            <div className="flex flex-col gap-3.5">
                                {controller.filter.category.map(category => (
                                    <label key={category.slug} className="flex items-center gap-3 cursor-pointer group w-fit">
                                        <input
                                            type="radio"
                                            name="categoryFilter"
                                            checked={controller.currentCategory === category.slug}
                                            onChange={() => controller.handleCategoryChange(category.slug)}
                                            className="w-5 h-5 border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        />
                                        <span className="text-[15px] font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                                            {category.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Products type */}
                        <div>
                            <h3 className="font-bold text-slate-800 mb-4 text-[15px] uppercase tracking-wide">Loại sản phẩm</h3>
                            <div className="flex flex-col gap-3.5">
                                {controller.filter.type.map(type => (
                                    <label key={type.slug} className="flex items-center gap-3 cursor-pointer group w-fit">
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
                        <div>
                            <h3 className="font-bold text-slate-800 mb-4 text-[15px] uppercase tracking-wide">Thương Hiệu</h3>
                            <div className="flex flex-col gap-3.5">
                                {controller.filter.brand.map(brand => (
                                    <label key={brand.slug} className="flex items-center gap-3 cursor-pointer group w-fit">
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
                </div>

                {/* Main */}
                <div className="flex-1 w-full min-w-0">

                    {/* Sort Options */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 px-5 rounded-md mb-6">
                        <span className="text-[16px] text-slate-500 font-bold whitespace-nowrap hidden sm:block">
                            Sắp xếp theo:
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {SORT_OPTIONS.map((option) => (
                                <label
                                    key={option.slug}
                                    className={`
                                        px-4 py-2 rounded-md text-[14px] font-medium cursor-pointer transition-colors
                                        ${controller.currentSort === option.slug
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                        }
                                    `}
                                >
                                    <input
                                        type="radio"
                                        name="sort"
                                        value={option.slug}
                                        checked={controller.currentSort === option.slug}
                                        onChange={controller.handleSortChange}
                                        className="hidden"
                                    />
                                    {option.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Products */}
                    {controller.isLoading ? (
                        <div className="w-full flex justify-center items-center py-32 bg-white rounded-md border border-slate-200">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                            <span className="ml-3 text-slate-500 font-medium">Đang tải dữ liệu...</span>
                        </div>
                    ) : (
                        <>
                            {controller.products.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
                                    {controller.products.map((product) => (
                                        <div key={product.id}>
                                            <ProductCard data={product} isNew={false} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="w-full flex flex-col items-center justify-center py-20 bg-white rounded-md border border-slate-200">
                                    <span className="material-icons-outlined text-6xl mb-4 text-slate-300">inventory_2</span>
                                    <p className="text-lg text-slate-500 font-medium">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {controller.totalPages > 1 && (
                                <div className="mt-12 flex justify-center items-center gap-2 sm:gap-4">
                                    <button
                                        onClick={() => controller.handlePageChange(1)}
                                        disabled={controller.currentPage === 1}
                                        className="w-10 h-10 rounded-md flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Trang đầu"
                                    >
                                        <span className="material-icons-outlined text-[20px]">keyboard_double_arrow_left</span>
                                    </button>

                                    <button
                                        onClick={() => controller.handlePageChange(controller.currentPage - 1)}
                                        disabled={controller.currentPage === 1}
                                        className="w-10 h-10 rounded-md flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Trang trước"
                                    >
                                        <span className="material-icons-outlined text-[20px]">arrow_back_ios_new</span>
                                    </button>

                                    <form onSubmit={controller.handlePageSubmit} className="flex items-center gap-2">
                                        <span className="text-[15px] font-medium text-slate-700 hidden sm:inline">Trang</span>
                                        <input
                                            type="number"
                                            value={controller.pageInput}
                                            onChange={(e) => controller.setPageInput(e.target.value)}
                                            onBlur={() => controller.setPageInput(String(controller.currentPage))}
                                            className="w-14 h-10 text-center border border-slate-300 rounded-md text-[15px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hide-number-spinners"
                                            min={1}
                                            max={controller.totalPages}
                                        />
                                        <span className="text-[15px] font-medium text-slate-700">/ {controller.totalPages}</span>
                                        <button type="submit" className="hidden"></button>
                                    </form>

                                    <button
                                        onClick={() => controller.handlePageChange(controller.currentPage + 1)}
                                        disabled={controller.currentPage === controller.totalPages}
                                        className="w-10 h-10 rounded-md flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Trang sau"
                                    >
                                        <span className="material-icons-outlined text-[20px]">arrow_forward_ios</span>
                                    </button>

                                    <button
                                        onClick={() => controller.handlePageChange(controller.totalPages)}
                                        disabled={controller.currentPage === controller.totalPages}
                                        className="w-10 h-10 rounded-md flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Trang cuối"
                                    >
                                        <span className="material-icons-outlined text-[20px]">keyboard_double_arrow_right</span>
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