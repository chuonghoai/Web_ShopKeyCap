import { Link } from "react-router-dom";
import logoImg from "../../../../assets/logo.png";

function Footer() {
    return (
        <div className="w-full bg-linear-to-t from-slate-200/60 to-[#f1f5f9] pt-10 pb-8">
            <div className="max-w-350 mx-auto px-6 lg:px-10 flex flex-col gap-6">
                <div className="relative w-full h-70 md:h-70 rounded-3xl bg-slate-900 overflow-hidden shadow-xl flex items-center">
                    <img
                        src="src/assets/setupPc.png"
                        alt="Premium Keyboard Setup"
                        className="absolute inset-0 w-full h-full object-cover object-right opacity-75 md:opacity-90"
                    />

                    <div className="absolute inset-0 bg-linear-to-r from-[#020617]/80 via-[#0f172a]/45 to-[#0f172a]/10"></div>
                    <div className="relative z-10 px-8 md:px-16 flex flex-col items-start max-w-2xl">
                        <h2 className="text-[40px] md:text-[25px] font-bold text-white leading-tight pb-1 tracking-tight drop-shadow-lg">
                            Build Your Dream Keyboard
                        </h2>
                        <p className="text-[18px] text-slate-300 pb-8 max-w-lg font-medium leading-relaxed">
                            Premium custom keyboards, switches and keycaps designed for enthusiasts and gamers.
                        </p>
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[16px] font-bold rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:-translate-y-1">
                            Join the Community
                        </button>
                    </div>
                </div>

                <footer className="w-full bg-white rounded-3xl p-8 md:p-10 border border-slate-200/50 shadow-[0_8px_40px_rgba(0,0,0,0.03)]">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

                        <div className="md:col-span-5 flex flex-col gap-6">
                            <Link to="/" className="flex items-center gap-3">
                                <img src={logoImg} alt="Cyber Keys" className="h-10 w-auto object-contain" />
                                <span className="text-[24px] font-extrabold text-slate-900 tracking-tight">
                                    Cyber <span className="text-blue-600">Keys</span>
                                </span>
                            </Link>
                            <p className="text-[15px] text-slate-500 leading-relaxed font-medium max-w-[90%]">
                                Elevating your typing experience with premium mechanical keyboards, artisan keycaps, and enthusiast-grade switches. Built for those who demand the best.
                            </p>

                            <div className="flex items-center gap-4 mt-2">
                                <a href="#" className="w-11 h-11 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] transition-all duration-300">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z" /></svg>
                                </a>
                                <a href="#" className="w-11 h-11 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] transition-all duration-300">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                </a>
                                <a href="#" className="w-11 h-11 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] transition-all duration-300">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                                </a>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex flex-col gap-5">
                            <h3 className="font-semibold text-[16px] text-slate-900 tracking-wide">Shop</h3>
                            <div className="flex flex-col gap-4">
                                <Link to="#" className="text-[15px] text-slate-500 hover:text-blue-600 font-medium transition-colors">Custom Keyboards</Link>
                                <Link to="#" className="text-[15px] text-slate-500 hover:text-blue-600 font-medium transition-colors">Premium Switches</Link>
                                <Link to="#" className="text-[15px] text-slate-500 hover:text-blue-600 font-medium transition-colors">Artisan Keycaps</Link>
                                <Link to="#" className="text-[15px] text-slate-500 hover:text-blue-600 font-medium transition-colors">Desk Mats & Accs</Link>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex flex-col gap-5">
                            <h3 className="font-semibold text-[16px] text-slate-900 tracking-wide">Support</h3>
                            <div className="flex flex-col gap-4">
                                <Link to="#" className="text-[15px] text-slate-500 hover:text-blue-600 font-medium transition-colors">Help Center & FAQ</Link>
                                <Link to="#" className="text-[15px] text-slate-500 hover:text-blue-600 font-medium transition-colors">Track Order</Link>
                                <Link to="#" className="text-[15px] text-slate-500 hover:text-blue-600 font-medium transition-colors">Warranty & Returns</Link>
                                <Link to="#" className="text-[15px] text-slate-500 hover:text-blue-600 font-medium transition-colors">Contact Us</Link>
                            </div>
                        </div>

                        <div className="md:col-span-3 flex flex-col gap-5">
                            <h3 className="font-semibold text-[16px] text-slate-900 tracking-wide">Stay Updated</h3>
                            <p className="text-[15px] text-slate-500 leading-relaxed font-medium">
                                Get access to exclusive drops, new switch releases, and enthusiast news.
                            </p>

                            <form className="relative mt-1 w-full max-w-sm">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full h-13 pl-5 pr-14 rounded-2xl bg-slate-50 border border-slate-200 text-[15px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all"
                                >
                                    <span className="material-icons-outlined text-[20px]">arrow_forward</span>
                                </button>
                            </form>
                        </div>

                    </div>

                    <div className="mt-5.5 -mb-4 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[15px] font-medium text-slate-400">
                            © {new Date().getFullYear()} Cyber Keys. All rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                            <Link to="#" className="text-[15px] font-medium text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</Link>
                            <Link to="#" className="text-[15px] font-medium text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</Link>
                            <Link to="#" className="text-[15px] font-medium text-slate-400 hover:text-slate-600 transition-colors">Shipping Info</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Footer;