import React from 'react';
import { useRegisterController } from './register.controller';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export const RegisterForm: React.FC<{ onNavigate: (v: 'login' | 'register') => void }> = ({ onNavigate }) => {
    const controller = useRegisterController();

    return (
        <div className="w-full max-w-[400px] bg-white p-6 sm:p-7 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            {/* Title */}
            <div className="text-center mb-3">
                <p className="text-[13px] text-slate-500 font-medium">Chào mừng đến với</p>
                <h2 className="text-[26px] font-bold text-[#0f172a] mt-0.5 tracking-tight">
                    Cyber <span className="text-blue-600">Keys</span>
                </h2>
                <p className="text-[13px] text-slate-500 mt-1">Bắt đầu hành trình của bạn</p>
            </div>

            {/* Form */}
            <form onSubmit={controller.handleRegister} className="space-y-2">

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
                        <button
                            type="button"
                            disabled={controller.timer > 0 || controller.isSendingOtp}
                            onClick={controller.handleSendOtp}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg text-[13px] font-medium transition-colors disabled:bg-gray-300 cursor-pointer whitespace-nowrap"
                        >
                            {controller.timer > 0 ? `${controller.timer}s` : 'Gửi OTP'}
                        </button>
                    </div>
                </div>

                {/* OTP Input */}
                <div>
                    <label className="block text-[13px] font-medium text-[#334155] mb-1">Mã xác thực (OTP)</label>
                    <input
                        className="w-full px-3 py-2 rounded-lg border border-[#cbd5e1] focus:outline-none focus:border-[#2563eb] text-[14px]"
                        value={controller.otp}
                        placeholder='Nhập mã OTP'
                        onChange={e => controller.setOtp(e.target.value)}
                        required
                    />
                </div>

                {/* Password */}
                {[controller.password, controller.confirmPassword].map((val, idx) => (
                    <div key={idx}>
                        <label className="block text-[13px] font-medium text-[#334155] mb-1">
                            {idx === 0 ? "Mật khẩu" : "Xác nhận mật khẩu"}
                        </label>
                        <div className="relative">
                            <input
                                type={controller.showPassword ? 'text' : 'password'}
                                className="w-full px-3 py-2 rounded-lg border border-[#cbd5e1] focus:outline-none focus:border-[#2563eb] text-[14px] pr-10 [&:is(input[type=password])::-ms-reveal]:hidden [&:is(input[type=password])::-ms-clear]:hidden [&:is(input[type=password])::-webkit-contacts-auto-fill-button]:hidden"
                                value={val}
                                placeholder={idx === 0 ? 'Nhập mật khẩu' : 'Xác nhận mật khẩu'}
                                onChange={e => idx === 0 ? controller.setPassword(e.target.value) : controller.setConfirmPassword(e.target.value)}
                                required
                            />
                            <button type="button" onClick={controller.togglePassword} className="absolute right-3 top-2.5 text-slate-400 hover:text-blue-600 cursor-pointer">
                                {controller.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                ))}

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
                        "Đăng ký tài khoản"
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