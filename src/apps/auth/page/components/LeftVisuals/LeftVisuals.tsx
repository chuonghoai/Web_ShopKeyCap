import React from 'react';

import keyboardImg from '../assets/keyboard.png';
import triangleImg from '../assets/triangle.png';
import triangleHollowImg from '../assets/triangle_hollow.png';
import logoImg from '../../../../../assets/logo.png';

export const LeftVisuals: React.FC = () => {
    return (
        <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] overflow-hidden">
            <style>
                {`
                @keyframes float-keyboard {
                    0%, 100% { transform: translateY(0) rotate(-2deg); }
                    50% { transform: translateY(-20px) rotate(0deg); }
                }
                @keyframes float-triangle {
                    0%, 100% { transform: translateY(0) rotate(12deg); }
                    50% { transform: translateY(-15px) rotate(20deg); }
                }
                @keyframes float-triangle-hollow {
                    0%, 100% { transform: translateY(0) rotate(-12deg); }
                    50% { transform: translateY(-25px) rotate(-5deg); }
                }
                @keyframes float-line {
                    0%, 100% { transform: translateY(0) rotate(-12deg); }
                    50% { transform: translateY(-15px) rotate(-12deg); } 
                }

                .animate-keyboard { animation: float-keyboard 6s ease-in-out infinite; }
                .animate-triangle { animation: float-triangle 7s ease-in-out infinite; }
                .animate-triangle-hollow { animation: float-triangle-hollow 8s ease-in-out infinite; }
                .animate-line { animation: float-line 6s ease-in-out infinite; }
                `}
            </style>

            <div className="absolute top-[15%] left-[10%] w-[350px] h-[350px] bg-blue-400/20 rounded-full blur-[100px] z-0 pointer-events-none"></div>
            <div className="absolute bottom-[5%] right-[10%] w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[120px] z-0 pointer-events-none"></div>

            {/* Logo, brand name and sub title */}
            <div className="absolute top-[6%] left-[8%] z-20 pointer-events-none">
                <div className="flex items-center gap-3 mb-8">
                    <img src={logoImg} alt="Cyber Keys Logo" className="w-10 h-10 object-contain" />
                    <span className="text-[24px] font-bold text-[#0f172a] tracking-tight">Cyber Keys</span>
                </div>

                <div>
                    <h1 className="text-[48px] font-extrabold text-[#0f172a] leading-[1.15] tracking-tight">
                        Tactile Excellence,<br />
                        <span className="text-blue-600">Reimagined.</span>
                    </h1>
                    <p className="text-[#475569] text-[16px] mt-4 font-medium max-w-[400px] leading-relaxed">
                        Premium mechanical keyboards crafted for performance, built for passion.
                    </p>
                </div>
            </div>

            {/* Keyboard */}
            <img
                src={keyboardImg}
                alt="Mechanical Keyboard"
                className="absolute -bottom-10 -left-0 w-[90%] max-w-none z-10 object-contain animate-keyboard pointer-events-none mix-blend-multiply"
            />

            {/* Line straigth */}
            <div className="absolute left-[11%] bottom-[53%] w-32 h-[4px] bg-[#2563eb] transform -rotate-20 rounded-full z-0 opacity-60 animate-line pointer-events-none"></div>
            <div className="absolute left-[30%] bottom-[60.8%] w-10 h-[4px] bg-[#2563eb] transform -rotate-20 rounded-full z-0 opacity-60 animate-line pointer-events-none"></div>
            <div className="absolute left-[55%] bottom-[9%] w-32 h-[4px] bg-[#2563eb] transform -rotate-20 rounded-full z-0 opacity-60 animate-line pointer-events-none"></div>

            {/* Triangle */}
            <img
                src={triangleImg}
                alt="Triangle"
                className="absolute right-[18%] top-[29%] w-14 z-10 transform -rotate-87 animate-triangle pointer-events-none mix-blend-multiply"
            />
            <img
                src={triangleHollowImg}
                alt="Hollow Triangle"
                className="absolute right-[20%] bottom-[13%] w-14 z-10 transform -rotate-75 animate-triangle-hollow pointer-events-none mix-blend-multiply"
            />
        </div>
    );
};