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
            relative -mx-6 -mt-8
            min-h-[60vh]
            flex flex-col items-center justify-center
            pt-32 pb-5
            overflow-hidden
        ">
            <div className="absolute inset-0 bg-linear-to-b from-white via-blue-50/70 to-[#dbeafe]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-200/40 rounded-full blur-[100px] opacity-60 pointer-events-none" />

            {/* Image keyboard */}
            <div className="relative z-10 flex items-center justify-center mb-7 mt-8">
                <img
                    src="src/apps/client/pages/homepage/assets/keyboard.png"
                    alt="Featured Keyboard"
                    className="
                        w-full 
                        object-contain
                        hover:scale-[1.03] transition-transform duration-700
                        drop-shadow-[0_30px_60px_rgba(37,99,235,0.22)]
                    "
                />
            </div>

            {/* Main tittle */}
            <h1 className="
                relative z-10
                text-[36px] md:text-[52px]
                font-extrabold text-slate-900
                tracking-tight text-center
                drop-shadow-[0_2px_8px_rgba(37,99,235,0.10)]
                px-6 pb-0 pt-0
                leading-tight
            ">
                Nâng Tầm Trải Nghiệm{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-500">
                    Gõ Phím Của Bạn
                </span>
            </h1>

            {/* Sub tittle */}
            <p className="
                relative z-10
                text-[16px] md:text-[18px]
                text-slate-500 font-medium
                text-center max-w-lg px-6 pb-5 pt-0
                drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]
            ">
                Khám phá bộ sưu tập bàn phím cơ custom đỉnh cao,
                switch mượt mà và keycap độc đáo nhất tại Cyber Keys.
            </p>

            {/* Button scroll to product list */}
            <button
                onClick={handleScrollToProducts}
                className="
                    relative z-10
                    px-10 py-4
                    mb-5
                    bg-[#2563eb] hover:bg-blue-700
                    text-white text-[17px] font-bold
                    rounded-full
                    shadow-[0_8px_30px_rgba(37,99,235,0.40)]
                    hover:shadow-[0_12px_36px_rgba(37,99,235,0.55)]
                    transition-all duration-200
                    transform hover:-translate-y-1
                "
            >
                Khám Phá Ngay
            </button>
        </section>
    );
}

export default HeroSection;