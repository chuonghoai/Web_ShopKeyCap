import React from 'react';
import { LeftVisuals } from '../components/LeftVisuals/LeftVisuals';
import { LoginForm } from '../components/LoginForm/loginForm';
import { useAuthPageController } from './authPage.controller';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm/registerForm';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm/forgotPassword';
import { ResetPasswordForm } from '../components/ResetPasswordForm/resetPasswordForm';

const AuthPage: React.FC = () => {
  const controller = useAuthPageController();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f1f5f9] font-sans">

      {/* Left side */}
      <LeftVisuals />

      {/* Right side */}
      <div
        ref={controller.rightPaneRef}
        onMouseMove={controller.handleMouseMove}
        onMouseEnter={() => controller.setIsHovering(true)}
        onMouseLeave={() => controller.setIsHovering(false)}
        className="flex-1 relative flex flex-col items-center justify-center h-full p-4 sm:p-6 bg-[#fafafb] overflow-hidden"
      >

        {/* Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}>
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{
            opacity: 0.15,
            backgroundImage: 'linear-gradient(to right, #030405ff 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            WebkitMaskImage: `radial-gradient(circle ${controller.isHovering ? '250px' : '450px'} at ${controller.isHovering ? `${controller.mousePos.x}px ${controller.mousePos.y}px` : '50% 50%'}, black, transparent)`,
            maskImage: `radial-gradient(circle ${controller.isHovering ? '250px' : '450px'} at ${controller.isHovering ? `${controller.mousePos.x}px ${controller.mousePos.y}px` : '50% 50%'}, black, transparent)`,
          }}>
        </div>

        {/* Button back to home */}
        <div className="absolute top-5 right-6 sm:right-10 z-20">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-[14px] cursor-pointer font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-800 transition-colors px-3.5 py-2 rounded-xl shadow-sm border border-blue-100">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Trở lại trang chủ
          </button>
        </div>

        {/* Form input */}
        <div
          ref={controller.formContainerRef}
          onMouseDown={() => controller.setIsFormActive(true)}
          className={`relative w-full flex justify-center mt-4 transition-all duration-500 ease-out origin-center
            ${controller.isFormActive ? 'scale-[1.02] drop-shadow-[0_25px_35px_rgba(37,99,235,0.15)] z-50' : 'scale-100 z-10'}
          `}
        >
          {controller.currentView === 'login' && <LoginForm onNavigate={controller.setCurrentView} />}
          {controller.currentView === 'register' && <RegisterForm onNavigate={controller.setCurrentView} />}
          {controller.currentView === 'forgot-password' && <ForgotPasswordForm onNavigate={controller.setCurrentView} />}
          {controller.currentView === 'reset-password' && (
            <ResetPasswordForm email={controller.resetEmail} onNavigate={controller.setCurrentView} />
          )}
        </div>

        {/* Info component */}
        <div className="relative z-10 w-full max-w-120 mt-6 flex justify-between gap-2 px-2">
          <div className="flex flex-col items-center text-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-[12px] font-bold text-slate-800">Bảo mật dữ liệu</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 max-w-20">Dữ liệu được bảo vệ an toàn.</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <div>
              <h4 className="text-[12px] font-bold text-slate-800">Giao hàng nhanh</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 max-w-30">Giao hàng tốc hành toàn quốc.</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-[12px] font-bold text-slate-800">Hỗ trợ 24/7</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 max-w-30">Chúng tôi hỗ trợ bạn bất kỳ lúc nào.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-3 text-center w-full z-10">
          <p className="text-[11px] text-slate-400 font-medium">
            © 2026 Cyber Keys. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;