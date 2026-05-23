import React from 'react';
import { useForgotPasswordController } from './forgotPassword.controller';
import { ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
    onNavigate: (view: any, email?: string) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onNavigate }) => {
    const controller = useForgotPasswordController(onNavigate);

    return (
        <div className="w-full max-w-[400px] bg-white p-6 sm:p-7 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            {/* Title */}
            <div className="text-center mb-3">
                <p className="text-[13px] text-slate-500 font-medium">Vui lòng nhập</p>
                <h2 className="text-[26px] font-bold text-[#0f172a] mt-0.5 tracking-tight">
                    Địa chỉ <span className="text-blue-600">email</span>
                </h2>
                <p className="text-[13px] text-slate-500 mt-1">Để xác thực thông tin người dùng</p>
            </div>

            {/* Form */}
            <form onSubmit={controller.handleSendOtp} className="space-y-2">

                {/* Email Input */}
                <div>
                    <label className="block text-[13px] font-medium text-[#334155] mb-1">Địa chỉ Email</label>
                    <div className="flex gap-2">
                        <input
                            className="w-full px-3 py-2 rounded-lg border border-[#cbd5e1] focus:outline-none focus:border-[#2563eb] text-[14px]"
                            value={controller.email}
                            placeholder='Nhập email của bạn'
                            onChange={e => controller.setEmail(e.target.value)}
                            type='email'
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={controller.isLoading}
                    className={`w-full mt-2 py-2.5 rounded-lg font-semibold text-[14px] transition-colors shadow-md shadow-blue-500/30
                        ${controller.isLoading
                            ? "bg-gray-400 cursor-not-allowed opacity-70"
                            : "bg-[#2563eb] hover:bg-[#1d4ed8] text-white cursor-pointer"}
                    `}
                >
                    {controller.isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            Đang xử lý...
                        </span>
                    ) : (
                        "Xác thực và gửi mã OTP"
                    )}
                </button>
            </form>

            <div className="mt-6 text-center">
                <button
                    onClick={() => onNavigate('login')}
                    className="inline-flex items-center gap-1.5 text-[14px] text-blue-600 font-medium hover:underline cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    Quay lại đăng nhập
                </button>
            </div>
        </div>
    );
};