import React from 'react';
import { useLoginController } from './login.controller';
import { Eye, EyeOff } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { useToastStore } from '../../../../../core/store/useToastStore';

interface LoginFormProps {
    onNavigate: (view: 'login' | 'register' | 'forgot-password') => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onNavigate }) => {
    const controller = useLoginController();
    const toast = useToastStore(state => state.addToast);

    return (
        <div className="w-full max-w-100 bg-white p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">

            {/* Title */}
            <div className="text-center mb-5">
                <p className="text-[14px] text-slate-500 font-medium">Chào mừng trở lại</p>
                <h2 className="text-[28px] font-bold text-[#0f172a] mt-0.5 tracking-tight">
                    Cyber <span className="text-blue-600">Keys</span>
                </h2>
                <p className="text-[13px] text-slate-500 mt-1">Tiếp tục hành trình của bạn</p>
            </div>

            {/* Form input login */}
            <form onSubmit={controller.handleSubmit} className="space-y-2">
                <div>
                    <label htmlFor="email" className="block text-[13px] font-medium text-[#334155] mb-1.5">
                        Địa chỉ Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Nhập email của bạn"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] text-[#0f172a] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-colors placeholder:text-slate-400 text-[14px]"
                        value={controller.email}
                        onChange={(e) => controller.setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-[13px] font-medium text-[#334155] mb-1.5">
                        Mật khẩu
                    </label>
                    <div className="relative">
                        <input
                            type={controller.showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Nhập mật khẩu"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] text-[#0f172a] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-colors placeholder:text-slate-400 text-[14px] pr-10 [&:is(input[type=password])::-ms-reveal]:hidden [&:is(input[type=password])::-ms-clear]:hidden [&:is(input[type=password])::-webkit-contacts-auto-fill-button]:hidden"
                            value={controller.password}
                            onChange={(e) => controller.setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={controller.toggleShowPassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-blue-600 transition-colors"
                        >
                            {controller.showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-3.5 h-3.5 rounded border-gray-300 text-[#2563eb] focus:ring-[#2563eb]"
                        />
                        <span className="text-[13px] text-[#475569]">Ghi nhớ đăng nhập</span>
                    </label>
                    <button
                        type="button"
                        onClick={() => onNavigate('forgot-password')}
                        className="text-[13px] text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
                    >
                        Quên mật khẩu?
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg font-semibold text-[14px] transition-colors mt-1 shadow-md shadow-blue-500/30 cursor-pointer"
                >
                    Đăng Nhập
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </form>

            <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Hoặc</span>
                <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center">
                    <GoogleLogin
                        onSuccess={controller.handleGoogleLoginSuccess}
                        onError={() => {
                            toast("Đăng nhập Google thất bại", 'error');
                        }}
                        useOneTap
                        theme="filled_blue"
                        shape="rectangular"
                        width="320"
                    />
                </div>
            </div>

            <div className="mt-5 text-center text-[13px] text-slate-500">
                Không có tài khoản?{' '}
                <button
                    onClick={() => onNavigate('register')}
                    className="text-blue-600 font-semibold hover:underline transition-colors cursor-pointer"
                >
                    Tạo tài khoản
                </button>
            </div>
        </div>
    );
};