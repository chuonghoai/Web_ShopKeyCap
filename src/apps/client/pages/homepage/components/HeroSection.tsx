import type { MouseEvent } from 'react';

function HeroSection() {
    const handleScrollToProducts = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const productSection = document.getElementById('product-list');
        if (productSection) {
            productSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="
            relative -mx-6 -mt-22
            min-h-[60vh]
            flex flex-col items-center justify-center
            pt-32 pb-5
            overflow-hidden
        ">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-b from-slate-100 via-blue-100 to-blue-200" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-300/50 rounded-full blur-[100px] opacity-60 pointer-events-none" />

            {/* Image keyboard */}
            <div className="relative z-10 flex items-center justify-center mb-7 mt-8">
                <img
                    src="src/apps/client/pages/homepage/assets/keyboard.png"
                    alt="Featured Keyboard"
                    className="
                        w-full
                        scale-[1.15]
                        object-contain
                        hover:scale-[1.28] transition-transform duration-700
                        drop-shadow-[0_25px_40px_rgba(0,0,0,0.35)]
                    "
                />
            </div>

            {/* Main title */}
            <h1 className="
                relative z-10
                text-[36px] md:text-[52px]
                font-extrabold text-slate-900
                tracking-tight text-center
                drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)]
                px-6 pb-0 pt-0
                leading-tight
            ">
                Build Your{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-500 drop-shadow-[0_2px_5px_rgba(37,99,235,0.4)]">
                    Dream Keyboard
                </span>
            </h1>

            {/* Sub title */}
            <p className="
                relative z-10
                text-[16px] md:text-[18px]
                text-slate-600 font-medium
                text-center max-w-lg px-6 pb-5 pt-0
                drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]
            ">
                Bàn phím custom, switch premium và keycap độc lạ
                <br />
                dành cho những người yêu cảm giác gõ.
            </p>

            {/* Button scroll to product list */}
            <button
                onClick={handleScrollToProducts}
                className="
                    relative z-10
                    px-10 py-4
                    mb-5
                    bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600
                    bg-size-[200%_auto]
                    bg-left hover:bg-right
                    text-white text-[17px] font-bold
                    rounded-full
                    shadow-[0_10px_30px_rgba(37,99,235,0.5)]
                    hover:shadow-[0_15px_40px_rgba(37,99,235,0.7)]
                    transition-all duration-500
                    transform hover:-translate-y-1
                "
            >
                Khám Phá Ngay
            </button>
        </section>
    );
}

export default HeroSection;