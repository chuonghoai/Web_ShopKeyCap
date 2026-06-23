import React from "react";
import { Link } from "react-router-dom";
import { useOrderReviewsController } from "./orderReviews.controller";
import { ProductListSidebar } from "./components/ProductListSidebar";
import { ReviewEditor } from "./components/ReviewEditor";
import { ReviewSummary } from "./components/ReviewSummary";

export const OrderReviewsPage: React.FC = () => {
    const {
        order,
        availableReviews,
        selectedProductId,
        handleSelectProduct,
        isLoading,
        isError,
        createReviewMutation,
        refetchReviews
    } = useOrderReviewsController();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isError || !order) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-slate-200">
                <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                    <span className="material-icons-outlined text-[48px] text-rose-300">error_outline</span>
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">Không thể tải thông tin đơn hàng</h3>
                <p className="text-slate-500 mb-6">Đơn hàng không tồn tại hoặc đã xảy ra lỗi.</p>
                <Link to="/user/orders" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium">
                    Về danh sách đơn hàng
                </Link>
            </div>
        );
    }

    const selectedItem = order.items.find(item => item.productId === selectedProductId);
    const existingReview = availableReviews.find(r => r.productId === selectedProductId);

    const handleSubmitReview = (rating: number, content: string) => {
        if (!selectedProductId) return;

        createReviewMutation.mutate({
            orderId: order.id,
            reviews: [
                {
                    productId: selectedProductId,
                    rating,
                    content
                }
            ]
        }, {
            onSuccess: () => {
                // Refresh data to show the new review
                refetchReviews();
            }
        });
    };

    return (
        <div className="flex flex-col gap-6 max-w-350 mx-auto w-full">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Đánh giá sản phẩm</h1>
                <p className="text-slate-500 text-sm mt-1">Chia sẻ nhận xét của bạn về các sản phẩm trong đơn hàng #{order.id}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Product List */}
                <div className="lg:col-span-4 h-full lg:sticky lg:top-6">
                    <ProductListSidebar 
                        order={order}
                        availableReviews={availableReviews}
                        selectedProductId={selectedProductId}
                        onSelectProduct={handleSelectProduct}
                    />
                </div>

                {/* Center Column: Review Editor */}
                <div className="lg:col-span-5 h-full">
                    <ReviewEditor 
                        orderId={order.id}
                        selectedItem={selectedItem}
                        existingReview={existingReview}
                        isSubmitting={createReviewMutation.isPending}
                        onSubmitReview={handleSubmitReview}
                    />
                </div>

                {/* Right Column: Review Summary */}
                <div className="lg:col-span-3 h-full lg:sticky lg:top-6">
                    <ReviewSummary 
                        order={order}
                        availableReviews={availableReviews}
                    />
                </div>
            </div>
        </div>
    );
};
