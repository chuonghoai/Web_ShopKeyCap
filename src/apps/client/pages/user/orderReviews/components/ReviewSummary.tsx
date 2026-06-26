import React from "react";
import { Link } from "react-router-dom";
import type { OrderModel } from "../../../../features/order/models/order.model";
import type { AvailableReview } from "../../../../features/review";

interface ReviewSummaryProps {
    order: OrderModel;
    availableReviews: AvailableReview[];
}

export const ReviewSummary: React.FC<ReviewSummaryProps> = ({ order, availableReviews }) => {
    const totalItems = order.items.length;
    const reviewedCount = availableReviews.length;
    const pendingCount = totalItems - reviewedCount;
    const isAllReviewed = pendingCount === 0;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className="p-6 bg-slate-900 text-white">
                <h3 className="font-bold text-lg">Tổng quan đánh giá</h3>
                <p className="text-slate-400 text-sm mt-1">Đơn hàng #{order.id}</p>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Tổng sản phẩm</span>
                    <span className="text-lg font-bold text-slate-900">{totalItems}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-500 font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Đã đánh giá
                    </span>
                    <span className="text-lg font-bold text-emerald-600">{reviewedCount}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-500 font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        Chưa đánh giá
                    </span>
                    <span className="text-lg font-bold text-amber-600">{pendingCount}</span>
                </div>

                {isAllReviewed ? (
                    <div className="mt-auto bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-100 text-center font-medium">
                        <span className="material-icons-outlined text-[32px] mb-2 text-emerald-500">check_circle</span>
                        <p>Cảm ơn bạn đã đánh giá toàn bộ sản phẩm trong đơn hàng này!</p>
                    </div>
                ) : (
                    <div className="mt-auto bg-blue-50 text-blue-700 p-4 rounded-xl border border-blue-100 text-sm text-center">
                        Hãy chia sẻ trải nghiệm của bạn về các sản phẩm còn lại để giúp những người dùng khác nhé.
                    </div>
                )}

                <div className="mt-4 pt-4 border-t border-slate-100">
                    <Link
                        to={`/user/orders/${order.id}`}
                        className="w-full py-3 flex items-center justify-center gap-2 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors border border-slate-200"
                    >
                        <span className="material-icons-outlined text-[20px]">arrow_back</span>
                        Quay lại đơn hàng
                    </Link>
                </div>
            </div>
        </div>
    );
};
