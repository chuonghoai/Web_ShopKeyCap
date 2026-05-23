import React from 'react';

import keyboardImg from './assets/keyboard.png';
import triangleImg from './assets/triangle.png';
import triangleHollowImg from './assets/triangle_hollow.png';

export const LeftVisuals: React.FC = () => {
    return (
        <div className="hidden lg:flex flex-1 relative bg-[#fbfcfd] overflow-hidden">

            {/* Animation */}
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

            {/* Title */}
            <div className="absolute top-[8%] w-full text-center z-20 pointer-events-none">
                <h1 className="text-[42px] font-bold text-[#1e293b] tracking-tight">Cyber Keys</h1>
                <p className="text-[#64748b] text-[18px] mt-2 font-medium">Tactile Excellence, Reimagined</p>
            </div>

            {/* Keyboard */}
            <img
                src={keyboardImg}
                alt="Mechanical Keyboard"
                className="absolute -bottom-0 -left-0 w-[90%] max-w-none z-10 drop-shadow-[0_25px_35px_rgba(0,0,0,0.2)] object-contain animate-keyboard pointer-events-none"
            />

            {/* Line straight */}
            <div className="absolute left-[11%] bottom-[58%] w-32 h-[4px] bg-[#2563eb] transform -rotate-20 rounded-full z-0 opacity-60 animate-line pointer-events-none"></div>
            <div className="absolute left-[30%] bottom-[65.8%] w-10 h-[4px] bg-[#2563eb] transform -rotate-20 rounded-full z-0 opacity-60 animate-line pointer-events-none"></div>
            <div className="absolute left-[55%] bottom-[9%] w-32 h-[4px] bg-[#2563eb] transform -rotate-20 rounded-full z-0 opacity-60 animate-line pointer-events-none"></div>

            {/* Triangle */}
            <img
                src={triangleImg}
                alt="Triangle"
                className="absolute right-[18%] top-[29%] w-14 z-10 transform -rotate-87 animate-triangle pointer-events-none"
            />
            <img
                src={triangleHollowImg}
                alt="Hollow Triangle"
                className="absolute right-[20%] bottom-[13%] w-14 z-10 transform -rotate-75 animate-triangle-hollow pointer-events-none"
            />
        </div>
    );
};