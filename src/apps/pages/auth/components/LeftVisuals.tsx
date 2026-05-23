import React from 'react';

// Lưu ý: Đảm bảo đường dẫn import ảnh của bạn chính xác (có thể dùng import keyboardImg from './assets/keyboard.png')
const keyboardImg = 'src/apps/pages/auth/components/assets/keyboard.png';
const triangleImg = 'src/apps/pages/auth/components/assets/triangle.png';
const triangleHollowImg = 'src/apps/pages/auth/components/assets/triangle_hollow.png';

export const LeftVisuals: React.FC = () => {
    return (
        <div className="hidden lg:flex flex-1 relative bg-[#fbfcfd] flex-col items-center justify-center h-full overflow-hidden">
            {/* CSS Animation nhấp nhô được nhúng trực tiếp để dễ quản lý */}
            <style>
                {`
                @keyframes float-keyboard {
                    0%, 100% { transform: translateY(0) rotate(-2deg) scale(1.1); }
                    50% { transform: translateY(-25px) rotate(0deg) scale(1.1); }
                }
                @keyframes float-triangle {
                    0%, 100% { transform: translateY(0) rotate(12deg); }
                    50% { transform: translateY(-15px) rotate(20deg); }
                }
                @keyframes float-triangle-hollow {
                    0%, 100% { transform: translateY(0) rotate(-12deg); }
                    50% { transform: translateY(-25px) rotate(-5deg); }
                }
                .animate-keyboard { animation: float-keyboard 6s ease-in-out infinite; }
                .animate-triangle { animation: float-triangle 7s ease-in-out infinite; }
                .animate-triangle-hollow { animation: float-triangle-hollow 8s ease-in-out infinite; }
                `}
            </style>

            {/* Header Text */}
            <div className="absolute top-[12%] text-center z-20 w-full">
                <h1 className="text-[42px] font-bold text-[#1e293b] tracking-tight">Cyber Keys Login</h1>
                <p className="text-[#64748b] text-[18px] mt-2 font-medium">Tactile Excellence, Reimagined</p>
            </div>

            {/* Main Keyboard Image - Cài đặt lấp đầy màn hình và nhấp nhô */}
            <img
                src={keyboardImg}
                alt="Mechanical Keyboard"
                className="absolute -bottom-16 -left-12 w-[125%] max-w-none z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] object-cover animate-keyboard"
            />

            {/* Các nét đường thẳng nằm gần keyboard */}
            <div className="absolute left-[12%] top-[40%] w-32 h-[3px] bg-[#2563eb] transform -rotate-[30deg] rounded-full z-0 opacity-80"></div>
            <div className="absolute left-[26%] top-[35%] w-12 h-[3px] bg-[#2563eb] transform -rotate-[30deg] rounded-full z-0 opacity-80"></div>

            {/* Triangles */}
            <img
                src={triangleImg}
                alt="Decoration"
                className="absolute right-[18%] top-[32%] w-14 z-20 animate-triangle"
            />
            <img
                src={triangleHollowImg}
                alt="Decoration"
                className="absolute right-[22%] bottom-[25%] w-20 z-20 animate-triangle-hollow"
            />
        </div>
    );
};