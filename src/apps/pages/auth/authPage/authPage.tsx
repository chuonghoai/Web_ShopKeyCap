import React, { useState } from 'react';
import { LeftVisuals } from '../components/LeftVisuals';
import { LoginForm } from '../components/LoginForm/loginForm';

// Component mẫu
const RegisterForm = ({ onNavigate }: { onNavigate: any }) => (
  <div className="text-center p-8 bg-white rounded-xl shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-bold mb-4">Register Form</h2>
    <button onClick={() => onNavigate('login')} className="text-blue-600 underline">Back to Login</button>
  </div>
);

const ForgotPasswordForm = ({ onNavigate }: { onNavigate: any }) => (
  <div className="text-center p-8 bg-white rounded-xl shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
    <button onClick={() => onNavigate('login')} className="text-blue-600 underline">Back to Login</button>
  </div>
);

type ViewState = 'login' | 'register' | 'forgot';

const LoginPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('login');

  return (
    // Sử dụng h-screen w-screen overflow-hidden để lấp đầy 100% màn hình
    <div className="flex h-screen w-screen overflow-hidden bg-[#f1f5f9] font-sans">

      {/* Left side visuals */}
      <LeftVisuals />

      {/* Right side form container */}
      <div className="flex-1 flex items-center justify-center h-full p-6 bg-white lg:bg-[#fafafb]">
        {currentView === 'login' && <LoginForm onNavigate={setCurrentView} />}
        {currentView === 'register' && <RegisterForm onNavigate={setCurrentView} />}
        {currentView === 'forgot' && <ForgotPasswordForm onNavigate={setCurrentView} />}
      </div>
    </div>
  );
};

export default LoginPage;