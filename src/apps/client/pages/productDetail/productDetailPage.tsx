import DOMPurify from "dompurify";
import { useProductDetailController } from "./productDetail.controller";
import ProductCard from "../homepage/components/ProductCard";

export const ProductDetailPage = () => {
    const controller = useProductDetailController();
    const { product, isLoading, error } = controller;

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center py-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="w-full text-center py-40 text-slate-500">
                <span className="material-icons-outlined text-6xl mb-4 text-slate-300">error_outline</span>
                <h2 className="text-xl font-bold">{error || "Sản phẩm không tồn tại"}</h2>
            </div>
        );
    }

    const cleanHTMLDescription = DOMPurify.sanitize(product.description);

    return (
        <div className="w-full max-w-full mx-auto px-4 pb-20 pt-6">

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-[14px] text-slate-500 font-medium mb-8 overflow-x-auto whitespace-nowrap">
                <span onClick={() => controller.handleNavigateFilter('categorySlug', '')} className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
                <span className="material-icons-outlined text-[16px]">chevron_right</span>
                <span onClick={() => controller.handleNavigateFilter('categorySlug', product.category.slug)} className="hover:text-blue-600 cursor-pointer">
                    {product.category.name}
                </span>
                <span className="material-icons-outlined text-[16px]">chevron_right</span>
                <span onClick={() => controller.handleNavigateFilter('brandSlugs', product.brand.slug)} className="hover:text-blue-600 cursor-pointer">
                    {product.brand.name}
                </span>
                <span className="material-icons-outlined text-[16px]">chevron_right</span>
                <span className="text-slate-800">{product.name}</span>
            </div>

            {/* Main Product Info */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 bg-white p-6 lg:p-10 rounded-3xl border border-slate-100 shadow-sm mb-12">

                {/* Left: Images */}
                <div className="w-full lg:w-[45%] shrink-0">
                    <div className="bg-slate-50 rounded-2xl overflow-hidden aspect-square border border-slate-100 mb-4 flex items-center justify-center p-4">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply"
                        />
                    </div>
                </div>

                {/* Right: Info & Actions */}
                <div className="w-full lg:w-[55%] flex flex-col">
                    <h1 className="text-[24px] lg:text-[28px] font-bold text-slate-900 leading-snug mb-3">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-4 mb-6 text-[14px]">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <span className="material-icons-outlined text-[18px]">star</span>
                            {product.rating.toFixed(1)}
                        </div>
                        <div className="w-px h-4 bg-slate-300"></div>
                        <span className="text-slate-500">Thương hiệu: <span className="font-bold text-blue-600 cursor-pointer" onClick={() => controller.handleNavigateFilter('brandSlugs', product.brand.slug)}>{product.brand.name}</span></span>
                        <div className="w-px h-4 bg-slate-300"></div>
                        <span className="text-slate-500">Mã: <span className="font-bold text-slate-700">{controller.currentVariant?.sku || product.id}</span></span>
                    </div>

                    {/* Price Block */}
                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                        <div className="flex items-end gap-3">
                            <span className="text-[32px] font-extrabold text-blue-600 leading-none">
                                {controller.formatPrice(controller.displayPrice)}
                            </span>
                            {controller.displayOriginalPrice > controller.displayPrice && (
                                <span className="text-[16px] font-medium text-slate-400 line-through mb-1">
                                    {controller.formatPrice(controller.displayOriginalPrice)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Variants */}
                    <div className="flex flex-col gap-6 mb-8">
                        {controller.optionsWithStatus.map(option => (
                            <div key={option.name}>
                                <h3 className="text-[15px] font-bold text-slate-800 mb-3">{option.name}:</h3>
                                <div className="flex flex-wrap gap-3">
                                    {option.values.map(({ value, status }) => {
                                        const isSelected = status === "selected";
                                        const isDisabled = status === "disabled";
                                        return (
                                            <button
                                                key={value}
                                                onClick={() => !isDisabled && controller.handleOptionSelect(option.name, value)}
                                                disabled={isDisabled}
                                                title={isDisabled ? "Không có sẵn hoặc đã hết hàng" : undefined}
                                                className={`
                                                    relative px-5 py-2.5 rounded-xl text-[14px] font-medium transition-all border
                                                    ${isSelected
                                                        ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                                                        : isDisabled
                                                            ? "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                                                            : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50"
                                                    }
                                                `}
                                            >
                                                {isDisabled && (
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                                    >
                                                        <svg
                                                            className="w-full h-full absolute top-0 left-0 rounded-xl overflow-visible"
                                                            preserveAspectRatio="none"
                                                        >
                                                            <line
                                                                x1="0" y1="100%"
                                                                x2="100%" y2="0"
                                                                stroke="#cbd5e1"
                                                                strokeWidth="1.5"
                                                            />
                                                        </svg>
                                                    </span>
                                                )}
                                                {value}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add to Cart Actions */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <h3 className="text-[15px] font-bold text-slate-800">Số lượng:</h3>
                            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden h-11 bg-white">
                                <button
                                    onClick={() => controller.handleQuantityChange('decrease')}
                                    className="w-11 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                                >
                                    <span className="material-icons-outlined text-[18px]">remove</span>
                                </button>
                                <div className="w-12 h-full flex items-center justify-center text-[15px] font-bold text-slate-800 border-x border-slate-100">
                                    {controller.quantity}
                                </div>
                                <button
                                    onClick={() => controller.handleQuantityChange('increase')}
                                    className="w-11 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                                >
                                    <span className="material-icons-outlined text-[18px]">add</span>
                                </button>
                            </div>
                            <span className="text-[14px] text-slate-500 ml-2">
                                {controller.displayStock > 0 ? `${controller.displayStock} sản phẩm có sẵn` : <span className="text-red-500 font-bold">Hết hàng</span>}
                            </span>
                        </div>

                        <div className="flex gap-4 mt-2">
                            <button
                                onClick={controller.handleAddToCart}
                                disabled={controller.isAddingToCart || controller.displayStock === 0}
                                className={`
                                    flex-1 h-14 rounded-xl text-white font-bold text-[16px]
                                    flex items-center justify-center gap-2 transition-all
                                    ${(controller.isAddingToCart || controller.displayStock === 0)
                                        ? 'bg-slate-300 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:-translate-y-0.5'
                                    }
                                `}
                            >
                                {controller.isAddingToCart ? 'Đang thêm...' : (
                                    <>
                                        <span className="material-icons-outlined">shopping_cart</span>
                                        THÊM VÀO GIỎ HÀNG
                                    </>
                                )}
                            </button>
                            <button className="w-14 h-14 shrink-0 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors">
                                <span className="material-icons-outlined">favorite_border</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Content: Specs & Description */}
            <div className="flex flex-col lg:flex-row gap-10 w-full mb-16">

                {/* Product Description HTML */}
                <div className="w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-3xl border border-slate-100 shadow-sm">
                    <h2 className="text-[20px] font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">Đặc điểm nổi bật</h2>
                    <div
                        className="prose prose-slate max-w-none prose-img:rounded-2xl prose-img:mx-auto prose-headings:text-slate-800 prose-a:text-blue-600"
                        dangerouslySetInnerHTML={{ __html: cleanHTMLDescription }}
                    />
                </div>

                {/* Specifications */}
                <div className="w-full lg:w-1/3 self-start bg-white p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
                    <h2 className="text-[20px] font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">Thông số kỹ thuật</h2>
                    <div className="flex flex-col">
                        {product.specifications.map((spec, index) => (
                            <div key={index} className={`flex py-3.5 px-4 rounded-xl ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                                <span className="w-1/2 text-[14px] text-slate-500 font-medium">{spec.name}</span>
                                <span className="w-1/2 text-[14px] text-slate-900 font-bold">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {product.relateTo && product.relateTo.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                        <h2 className="text-[24px] font-bold text-slate-900">Sản phẩm tương tự</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
                        {product.relateTo.map(item => (
                            <ProductCard key={item.id} data={item} isNew={false} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;