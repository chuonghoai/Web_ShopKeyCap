import { memo } from "react";

export const CartStoreGuarantee = memo(() => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-8 mb-4">
            <h2 className="text-[18px] font-bold text-slate-900 mb-6 text-center">
                Cam kết của cửa hàng
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <span className="material-icons-outlined text-[24px]">verified</span>
                    </div>
                    <div>
                        <h4 className="text-[14px] font-semibold text-slate-800">Sản phẩm chính hãng</h4>
                        <p className="text-[12px] text-slate-500 mt-1">Đảm bảo 100% chính hãng</p>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <span className="material-icons-outlined text-[24px]">security</span>
                    </div>
                    <div>
                        <h4 className="text-[14px] font-semibold text-slate-800">Bảo hành chuẩn</h4>
                        <p className="text-[12px] text-slate-500 mt-1">Theo chính sách nhà sản xuất</p>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                        <span className="material-icons-outlined text-[24px]">autorenew</span>
                    </div>
                    <div>
                        <h4 className="text-[14px] font-semibold text-slate-800">Hỗ trợ đổi trả</h4>
                        <p className="text-[12px] text-slate-500 mt-1">Nhanh chóng theo quy định</p>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <span className="material-icons-outlined text-[24px]">local_shipping</span>
                    </div>
                    <div>
                        <h4 className="text-[14px] font-semibold text-slate-800">Giao hàng toàn quốc</h4>
                        <p className="text-[12px] text-slate-500 mt-1">Nhanh chóng & an toàn</p>
                    </div>
                </div>
            </div>
        </div>
    );
});
