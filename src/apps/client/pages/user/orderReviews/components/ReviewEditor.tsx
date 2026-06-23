import React, { useState, useEffect } from "react";
import type { OrderItemModel } from "../../../../features/order/models/order.model";
import type { AvailableReview } from "../../../../features/review";

interface ReviewEditorProps {
    orderId: number;
    selectedItem?: OrderItemModel;
    existingReview?: AvailableReview;
    isSubmitting: boolean;
    onSubmitReview: (rating: number, content: string) => void;
}

export const ReviewEditor: React.FC<ReviewEditorProps> = ({
    orderId,
    selectedItem,
    existingReview,
    isSubmitting,
    onSubmitReview
}) => {
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (existingReview) {
            setRating(existingReview.rating);
            setContent(existingReview.content);
        } else {
            setRating(5);
            setContent("");
        }
        setError("");
    }, [selectedItem?.productId, existingReview]);

    if (!selectedItem) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center h-full min-h-100 text-slate-500">
                <span className="material-icons-outlined text-[48px] mb-4 text-slate-300">rate_review</span>
                <p>Vui lòng chọn sản phẩm để đánh giá</p>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim().length < 10) {
            setError("Nội dung đánh giá phải có ít nhất 10 ký tự.");
            return;
        }
        if (content.trim().length > 1000) {
            setError("Nội dung đánh giá không được vượt quá 1000 ký tự.");
            return;
        }
        setError("");
        onSubmitReview(rating, content);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                <div className="w-16 h-16 shrink-0 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                    <img src={selectedItem.productImage} alt={selectedItem.productName} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{selectedItem.productName}</h3>
                    <p className="text-sm text-slate-500 mt-1">Đơn hàng #{orderId}</p>
                </div>
            </div>

            <div className="p-6 flex-1">
                {existingReview ? (
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm font-medium text-slate-700 w-24">Đánh giá của bạn:</span>
                            <div className="flex text-amber-400">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="material-icons text-[24px]">
                                        {star <= existingReview.rating ? "star" : "star_border"}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-sm font-medium text-slate-700 w-24 shrink-0">Nội dung:</span>
                            <p className="text-slate-800 bg-white p-4 rounded-lg border border-slate-200 flex-1 whitespace-pre-wrap leading-relaxed">
                                {existingReview.content}
                            </p>
                        </div>
                        <div className="mt-4 flex justify-end text-xs text-slate-400">
                            Đã đánh giá vào: {new Date(existingReview.createdAt).toLocaleDateString('vi-VN')}
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col h-full">
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-900 mb-2">Chất lượng sản phẩm</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`transition-transform hover:scale-110 focus:outline-none ${
                                            star <= rating ? "text-amber-400" : "text-slate-200 hover:text-amber-200"
                                        }`}
                                    >
                                        <span className="material-icons text-[40px]">star</span>
                                    </button>
                                ))}
                            </div>
                            <div className="text-sm text-amber-600 mt-2 font-medium">
                                {rating === 5 && "Tuyệt vời!"}
                                {rating === 4 && "Rất tốt"}
                                {rating === 3 && "Bình thường"}
                                {rating === 2 && "Không tốt"}
                                {rating === 1 && "Rất tệ"}
                            </div>
                        </div>

                        <div className="mb-6 flex-1 flex flex-col">
                            <label htmlFor="content" className="block text-sm font-medium text-slate-900 mb-2">
                                Nội dung đánh giá
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Hãy chia sẻ những điều bạn thích hoặc chưa thích về sản phẩm này nhé (tối thiểu 10 ký tự)..."
                                className={`flex-1 w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none bg-slate-50 focus:bg-white transition-colors ${
                                    error ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300'
                                }`}
                                minLength={10}
                                maxLength={1000}
                            />
                            {error && <p className="text-rose-500 text-sm mt-2 font-medium">{error}</p>}
                            <div className="text-right text-xs text-slate-400 mt-2">
                                {content.length}/1000 ký tự
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-slate-100 mt-auto">
                            <button
                                type="submit"
                                disabled={isSubmitting || content.trim().length < 10}
                                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Đang gửi...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-icons-outlined text-[20px]">send</span>
                                        Gửi đánh giá
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
