import React from 'react';
import { useLoginController } from './login.controller';

interface LoginFormProps {
    onNavigate: (view: 'login' | 'register' | 'forgot') => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onNavigate }) => {
    const controller = useLoginController();

    return (
        <div className="w-full max-w-[400px] bg-white p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">

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
                    <input
                        type="password"
                        id="password"
                        placeholder="Nhập mật khẩu"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] text-[#0f172a] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-colors placeholder:text-slate-400 text-[14px]"
                        value={controller.password}
                        onChange={(e) => controller.setPassword(e.target.value)}
                        required
                    />
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
                        onClick={() => onNavigate('forgot')}
                        className="text-[13px] text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        Quên mật khẩu?
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg font-semibold text-[14px] transition-colors mt-1 shadow-md shadow-blue-500/30"
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

            <div className="flex flex-col gap-2.5">
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-2 border border-[#e2e8f0] rounded-lg hover:bg-gray-50 transition-colors text-[13px] font-medium text-[#334155]"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Đăng nhập với Google
                </button>

                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-2 border border-[#e2e8f0] rounded-lg hover:bg-gray-50 transition-colors text-[13px] font-medium text-[#334155]"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.24-.86 3.44-.88 1.5-.06 2.62.62 3.35 1.54-2.82 1.6-2.31 5.48.51 6.55-.65 1.64-1.51 3.22-2.38 4.96zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.33 2.37-1.89 4.31-3.74 4.25z" />
                    </svg>
                    Đăng nhập với Apple
                </button>
            </div>

            <div className="mt-5 text-center text-[13px] text-slate-500">
                Không có tài khoản?{' '}
                <button
                    onClick={() => onNavigate('register')}
                    className="text-blue-600 font-semibold hover:underline transition-colors"
                >
                    Tạo tài khoản
                </button>
            </div>
        </div>
    );
};