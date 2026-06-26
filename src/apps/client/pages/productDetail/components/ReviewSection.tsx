import { useProductDetailViewModel } from "../useProductDetail.viewmodel";
import type { Review } from "../../../features/review/model/review.model";

export const ReviewSection = () => {
    const controller = useProductDetailViewModel();

    if (controller.loadingReview) {
        return (
            <div className="w-full flex justify-center items-center py-12 bg-white rounded-md border border-slate-200 mb-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-slate-500 font-medium">Đang tải đánh giá...</span>
            </div>
        );
    }

    if (controller.errorReview) {
        return (
            <div className="w-full text-center py-12 bg-white rounded-md border border-slate-200 mb-12 text-slate-500">
                <span className="material-icons-outlined text-4xl mb-2 text-slate-300">error_outline</span>
                <p className="font-medium">{controller.errorReview}</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-white p-6 lg:p-10 rounded-md border border-slate-200 mb-12">
            <h2 className="text-[20px] font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                Đánh giá sản phẩm
            </h2>

            {controller.reviewList.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                    <span className="material-icons-outlined text-4xl mb-2 text-slate-300">rate_review</span>
                    <p className="font-medium">Chưa có đánh giá nào cho sản phẩm này.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {controller.reviewList.map((review: Review) => (
                        <div key={review.id} className="flex flex-col gap-3 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3">
                                {review.user.avatar ? (
                                    <img src={review.user.avatar} alt={review.user.fullName} className="w-10 h-10 rounded-full object-cover bg-slate-100" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                        {review.user.fullName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <div className="font-bold text-slate-900 text-[15px]">{review.user.fullName}</div>
                                    <div className="flex items-center text-amber-500 text-[14px]">
                                        {Array.from({ length: 5 }).map((_, idx) => (
                                            <span key={idx} className="material-icons-outlined text-[16px]">
                                                {idx < review.rating ? 'star' : 'star_border'}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-700 text-[15px] leading-relaxed line-clamp-5">
                                {review.content}
                            </p>

                            {review.imageUrls && review.imageUrls.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {review.imageUrls.map((url: string, idx: number) => (
                                        <img key={idx} src={url} alt="Review attachment" className="w-20 h-20 object-cover rounded-sm border border-slate-200" />
                                    ))}
                                </div>
                            )}

                            <div className="text-[13px] text-slate-400 font-medium mt-1">
                                {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {controller.reviewTotalPages > 1 && (
                <div className="mt-10 flex justify-center items-center gap-2">
                    <button
                        onClick={() => controller.handleReviewPageChange(controller.reviewCurrentPage - 1)}
                        disabled={controller.reviewCurrentPage === 1}
                        className="w-9 h-9 rounded-md flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="material-icons-outlined text-[18px]">chevron_left</span>
                    </button>

                    <div className="text-[14px] font-medium text-slate-600 px-3">
                        Trang {controller.reviewCurrentPage} / {controller.reviewTotalPages}
                    </div>

                    <button
                        onClick={() => controller.handleReviewPageChange(controller.reviewCurrentPage + 1)}
                        disabled={controller.reviewCurrentPage === controller.reviewTotalPages}
                        className="w-9 h-9 rounded-md flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="material-icons-outlined text-[18px]">chevron_right</span>
                    </button>
                </div>
            )}
        </div>
    );
};
