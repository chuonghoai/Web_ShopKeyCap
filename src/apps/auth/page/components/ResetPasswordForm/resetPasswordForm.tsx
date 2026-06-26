import React from 'react';
import { useResetPasswordController } from './resetPassword.controller';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface ResetPasswordFormProps {
    email: string;
    onNavigate: (view: any) => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ email, onNavigate }) => {
    const controller = useResetPasswordController(email, onNavigate);

    return (
        <div className="w-full max-w-100 bg-white p-6 sm:p-7 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            {/* Title */}
            <div className="text-center mb-4">
                <p className="text-[13px] text-slate-500 font-medium">Đặt lại mật khẩu</p>
                <h2 className="text-[26px] font-bold text-[#0f172a] mt-0.5 tracking-tight">
                    Tạo <span className="text-blue-600">mật khẩu mới</span>
                </h2>
                <p className="text-[12px] text-slate-400 mt-1 truncate">Tài khoản: {email}</p>
            </div>

            {/* Form */}
            <form onSubmit={controller.handleSubmit} className="space-y-3">
                {/* OTP */}
                <div>
                    <label htmlFor="otp" className="block text-[13px] font-medium text-[#334155] mb-1">
                        Mã xác thực (OTP)
                    </label>
                    <input
                        type="text"
                        id="otp"
                        placeholder="Nhập mã OTP"
                        className="w-full px-3 py-2 rounded-lg border border-[#cbd5e1] focus:outline-none focus:border-[#2563eb] text-[14px]"
                        value={controller.otp}
                        onChange={(e) => controller.setOtp(e.target.value)}
                        required
                    />
                </div>

                {/* Password & Confirm*/}
                {[
                    {
                        id: 'newPassword',
                        label: 'Mật khẩu mới',
                        value: controller.newPassword,
                        setter: controller.setNewPassword,
                        placeholder: 'Nhập mật khẩu mới'
                    },
                    {
                        id: 'confirmPassword',
                        label: 'Xác nhận mật khẩu mới',
                        value: controller.confirmPassword,
                        setter: controller.setConfirmPassword,
                        placeholder: 'Xác nhận mật khẩu mới'
                    }
                ].map((field, _idx) => (
                    <div key={field.id}>
                        <label htmlFor={field.id} className="block text-[13px] font-medium text-[#334155] mb-1">
                            {field.label}
                        </label>
                        <div className="relative">
                            <input
                                type={controller.showPassword ? 'text' : 'password'}
                                id={field.id}
                                placeholder={field.placeholder}
                                className="w-full px-3 py-2 rounded-lg border border-[#cbd5e1] focus:outline-none focus:border-[#2563eb] text-[14px] pr-10 [&:is(input[type=password])::-ms-reveal]:hidden [&:is(input[type=password])::-ms-clear]:hidden [&:is(input[type=password])::-webkit-contacts-auto-fill-button]:hidden"
                                value={field.value}
                                onChange={(e) => field.setter(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={controller.togglePassword}
                                className="absolute right-3 top-2.5 text-slate-400 hover:text-blue-600 cursor-pointer"
                            >
                                {controller.showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={controller.isLoading}
                    className={`w-full py-2.5 rounded-lg font-semibold text-[14px] transition-colors shadow-md mt-2
                        ${controller.isLoading
                            ? "bg-gray-400 cursor-not-allowed opacity-70"
                            : "bg-[#2563eb] hover:bg-[#1d4ed8] text-white cursor-pointer"
                        }
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
                        "Xác nhận đặt lại"
                    )}
                </button>
            </form>

            <div className="mt-6 text-center">
                <button
                    onClick={() => onNavigate('forgot-password')}
                    className="inline-flex items-center gap-1.5 text-[14px] text-blue-600 font-medium hover:underline cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    Quay lại bước trước
                </button>
            </div>
        </div>
    );
};