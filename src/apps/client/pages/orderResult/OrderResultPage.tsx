import React from 'react';
import { useOrderResultController } from './useOrderResult.controller';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { EPaymentStatus } from '../../features/order/enums/paymentStatus.enum';
import { Link } from 'react-router-dom';

const OrderResultPage: React.FC = () => {
    const controller = useOrderResultController();

    if (!controller.orderId) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50/50 px-4 py-12">
                <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12 text-center">
                    <AlertTriangle className="w-20 h-20 text-red-500 mb-6 mx-auto" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Lỗi xác định đơn hàng</h1>
                    <p className="text-slate-600 mb-8">
                        Không thể xác định đơn hàng từ kết quả thanh toán.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-8 border-t border-slate-100">
                        <Link
                            to="/"
                            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            Trang chủ
                        </Link>
                        <Link
                            to='/user/orders/tracking'
                            className="px-8 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors"
                        >
                            Đơn hàng của bạn
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (controller.isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-500">Đang tải trạng thái đơn hàng...</p>
            </div>
        );
    }

    if (controller.isCapturing) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-500">Đang xử lý thanh toán PayPal...</p>
            </div>
        );
    }

    if (controller.error || !controller.result) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 px-4">
                <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Lỗi tải thông tin</h1>
                <p className="text-slate-600 mb-8 text-center max-w-md">
                    Không thể lấy trạng thái đơn hàng. Vui lòng kiểm tra lại đường truyền hoặc xem trong danh sách đơn hàng.
                </p>
                <div className="flex gap-4">
                    <Link
                        to='/'
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Trang chủ
                    </Link>
                    <Link
                        to='/user/orders/tracking'
                        className="px-6 py-2.5 bg-white text-slate-700 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                        Đơn hàng của bạn
                    </Link>
                </div>
            </div>
        );
    }

    const { result } = controller;

    // Helper to render UI based on state
    const renderContent = () => {
        if (controller.isCodPending) {
            return (
                <>
                    <CheckCircle className="w-20 h-20 text-green-500 mb-6 mx-auto" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Cảm ơn bạn đã đặt hàng</h1>
                    <p className="text-slate-600 mb-2">
                        Đơn hàng của bạn đã được tạo thành công với mã <strong>{result.orderId}</strong>.
                    </p>
                    <p className="text-slate-600 mb-8">
                        Chúng tôi sẽ sớm xác nhận và chuẩn bị đơn hàng cho bạn.
                    </p>
                </>
            );
        }

        if (controller.isOnlinePaid) {
            return (
                <>
                    <CheckCircle className="w-20 h-20 text-green-500 mb-6 mx-auto" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Cảm ơn bạn đã thanh toán</h1>
                    <p className="text-slate-600 mb-2">
                        Đơn hàng <strong>{result.orderId}</strong> đã được ghi nhận thanh toán thành công.
                    </p>
                    <p className="text-slate-600 mb-8">
                        Chúng tôi sẽ sớm chuẩn bị và giao đơn hàng cho bạn.
                    </p>
                </>
            );
        }

        if (result.paymentStatus === EPaymentStatus.FAILED) {
            return (
                <>
                    <AlertTriangle className="w-20 h-20 text-red-500 mb-6 mx-auto" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Thanh toán thất bại</h1>
                    <p className="text-slate-600 mb-2">
                        Giao dịch cho đơn hàng <strong>{result.orderId}</strong> không thành công.
                    </p>
                    <p className="text-slate-600 mb-8">
                        Vui lòng kiểm tra lại phương thức thanh toán hoặc thử lại sau.
                    </p>
                </>
            );
        }

        return (
            <>
                <Clock className="w-20 h-20 text-amber-500 mb-6 mx-auto" />
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Chưa hoàn tất thanh toán</h1>
                <p className="text-slate-600 mb-2">
                    Đơn hàng <strong>{result.orderId}</strong> chưa được xác nhận thanh toán.
                </p>
                <p className="text-slate-600 mb-8">
                    Nếu bạn vừa thanh toán, vui lòng đợi trong giây lát hoặc kiểm tra trong danh sách đơn hàng.
                </p>
            </>
        );
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50/50 px-4 py-12">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12 text-center">
                {renderContent()}

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-8 border-t border-slate-100">
                    <Link
                        to="/"
                        className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Tiếp tục mua hàng
                    </Link>
                    <Link
                        to={`/user/orders/${controller.orderId}`}
                        className="px-8 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                        Đơn hàng của bạn
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderResultPage;
