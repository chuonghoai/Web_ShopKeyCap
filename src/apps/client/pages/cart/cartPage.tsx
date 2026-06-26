import { Link } from "react-router-dom";
import { useCartViewModel } from "./useCart.viewmodel";
import { CartItemCard } from "./components/CartItemCard";
import { CartDeliveryInfo } from "./components/CartDeliveryInfo";
import { CartStoreGuarantee } from "./components/CartStoreGuarantee";
import { CartRelatedProducts } from "./components/CartRelatedProducts";

const CartPage = () => {
    const viewModel = useCartViewModel();

    if (viewModel.isLoading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50/50">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-500 font-medium">Đang tải giỏ hàng...</p>
            </div>
        );
    }

    if (viewModel.items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50/50 px-4">
                <div className="w-48 h-48 mb-6 text-slate-200">
                    <span className="material-icons-outlined text-[192px] leading-none">
                        remove_shopping_cart
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3">Giỏ hàng của bạn đang trống</h2>
                <p className="text-slate-500 mb-8 text-center max-w-md">
                    Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy khám phá các sản phẩm tuyệt vời của chúng tôi nhé!
                </p>
                <Link
                    to="/products"
                    className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                >
                    <span className="material-icons-outlined text-[20px]">storefront</span>
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50">
            <div className="max-w-390.5 mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 flex items-end justify-between gap-2">
                    <div>
                        <h1 className="-mt-1 mb-2.5 text-3xl font-bold text-slate-900 tracking-tight">Giỏ hàng</h1>
                        <p className="text-slate-500 mt-1.5 flex items-center gap-1.5">
                            Bạn đang có <strong className="text-blue-600">{viewModel.items.length}</strong> sản phẩm trong giỏ
                        </p>
                    </div>

                    <button
                        onClick={() => viewModel.refetch()}
                        className="p-2.5 rounded-xl cursor-pointer bg-white text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all shadow-sm"
                        title="Tải lại"
                    >
                        <span className="material-icons-outlined text-[20px]">refresh</span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Column: Cart Items */}
                    <div className="flex-1 w-full space-y-4">
                        {viewModel.items.map(item => (
                            <CartItemCard
                                key={item.id}
                                item={item}
                                onUpdateQuantity={viewModel.handleUpdateQuantity}
                                onDelete={viewModel.handleDeleteItem}
                                formatPrice={viewModel.formatPrice}
                            />
                        ))}
                    </div>

                    {/* Right Column: Order Summary & Delivery Info */}
                    <div className="w-full lg:w-95 shrink-0 sticky top-24 space-y-6">
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                            {/* Card Header */}
                            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                                <h2 className="text-[18px] font-bold text-slate-900 flex items-center gap-2">
                                    <span className="material-icons-outlined text-blue-600">receipt_long</span>
                                    Tổng quan đơn hàng
                                </h2>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-5">
                                <div className="flex justify-between items-end">
                                    <span className="text-[16px] font-medium text-slate-900">Tổng cộng</span>
                                    <div className="text-right">
                                        <span className="block text-[24px] font-bold text-blue-600 leading-none">
                                            {viewModel.formatPrice(viewModel.totalPrice)}
                                        </span>
                                        <span className="text-[13px] text-slate-400 mt-1 block">(Đã bao gồm VAT)</span>
                                    </div>
                                </div>

                                <button
                                    onClick={viewModel.handleCheckout}
                                    className="w-full py-3.5 mt-6 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-[16px] group"
                                >
                                    Tiến hành thanh toán
                                    <span className="material-icons-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </button>

                                <div className="pt-4 flex items-center justify-center gap-2 text-[13px] text-slate-400">
                                    <span className="material-icons-outlined text-[16px]">verified_user</span>
                                    Thanh toán an toàn & bảo mật
                                </div>
                            </div>
                        </div>

                        <CartDeliveryInfo
                            deliveryInfo={viewModel.deliveryInfo ?? null}
                            isLoading={viewModel.loadingDelivery}
                        />
                    </div>
                </div>

                {/* Related Products */}
                {!viewModel.isLoading && (
                    <CartRelatedProducts products={viewModel.relatedProducts} />
                )}

                {/* Store Guarantee */}
                <CartStoreGuarantee />
            </div>
        </div>
    );
};

export default CartPage;
