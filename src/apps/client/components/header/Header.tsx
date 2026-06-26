import { Link } from "react-router-dom";
import { useHeaderController } from "./header.controller";
import logoImg from "../../../../assets/logo.png";

function Header() {
    const controller = useHeaderController();
    const cartCount = controller.cartCount;

    return (
        <div className="top-0 left-0 right-0 z-50 p-4">
            <header className="max-w-250 mx-auto px-4 py-3 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-between gap-6">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 shrink-0 pl-2">
                    <img
                        src={logoImg}
                        alt="Cyber Keys"
                        className="h-8 w-auto object-contain"
                    />
                    <span className="text-[28px] font-bold text-[#0f172a] leading-none tracking-tight">
                        Cyber <span className="text-blue-600">Keys</span>
                    </span>
                </Link>

                {/* Form search */}
                <form 
                    className="flex-1 max-w-xl relative flex items-center"
                    onSubmit={controller.handleSearchSubmit}
                >
                    <span className="absolute left-3.5 text-slate-400 material-icons-outlined text-[20px] pointer-events-none">
                        search
                    </span>

                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        value={controller.keyword}
                        onChange={controller.handleSearchChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 border border-transparent text-slate-700 text-[16px] placeholder-slate-400 focus:bg-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all outline-none"
                    />
                </form>

                {/* Drop down menu | live button | profile button*/}
                <div className="flex items-center gap-3 shrink-0 pr-1">

                    <div className="relative group">
                        <button className="px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1 text-[17px] font-medium">
                            Danh mục <span className="material-icons-outlined text-[30px]">expand_more</span>
                        </button>

                        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                            <Link to="/" className="block px-4 py-2 text-[15px] text-slate-600 hover:bg-slate-50 hover:text-[#2563eb] transition-colors">Trang chủ</Link>
                            <Link to="/products" className="block px-4 py-2 text-[15px] text-slate-600 hover:bg-slate-50 hover:text-[#2563eb] transition-colors">Sản phẩm</Link>
                            <Link to="/about" className="block px-4 py-2 text-[15px] text-slate-600 hover:bg-slate-50 hover:text-[#2563eb] transition-colors">Giới thiệu</Link>
                        </div>
                    </div>

                    {/* Live button */}
                    {/* <Link to="/live" className="px-4 py-2 bg-[#2563eb] hover:bg-blue-700 text-white text-[14px] font-semibold rounded-xl shadow-md shadow-blue-500/30 transition-colors flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Live
                    </Link> */}

                    <div className="w-px h-6 bg-slate-200 mx-1"></div>

                    {/* Cart - Profile || Login button */}
                    {controller.user ? (
                        <div className="flex items-center gap-2.5">
                            {/* Cart button */}
                            <Link
                                to="/cart"
                                className="group relative w-10 h-10 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors flex items-center justify-center"
                            >
                                <span className="material-icons-outlined text-[20px]">
                                    shopping_cart
                                </span>

                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[12px] rounded-full flex items-center justify-center font-bold shadow-sm">
                                        {cartCount}
                                    </span>
                                )}

                                {/* Tooltip */}
                                <div className="absolute top-12 right-0 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-sm text-white shadow-lg opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                                    {cartCount === 0 ? "Giỏ hàng trống" : `Giỏ hàng có ${cartCount} sản phẩm`}
                                </div>
                            </Link>

                            {/* Profile Button */}
                            <div className="relative group">

                                <button className="cursor-pointer flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
                                    <img
                                        src={controller.user.avatar || `https://ui-avatars.com/api/?name=${controller.user.fullName || "User"}&background=2563eb&color=fff`}
                                        alt="Avatar"
                                        className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200"
                                    />
                                    <span className="text-[15px] font-semibold text-slate-700 truncate max-w-30">
                                        {controller.user.fullName || "Tài khoản"}
                                    </span>
                                </button>

                                {/* Menu User */}
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">

                                    <div className="px-4 py-3 border-b border-slate-100 mb-1 bg-slate-50/50 flex items-center justify-between gap-3">
                                        <div className="overflow-hidden flex-1">
                                            <p className="text-[13px] text-slate-500">Xin chào,</p>
                                            <p className="text-[16px] font-bold text-slate-900 truncate mt-0.5">
                                                {controller.user.fullName || "Tài khoản"}
                                            </p>
                                        </div>

                                        <img
                                            src={controller.user.avatar || `https://ui-avatars.com/api/?name=${controller.user.fullName || "User"}&background=2563eb&color=fff`}
                                            alt="Avatar Large"
                                            className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white shrink-0"
                                        />
                                    </div>

                                    <Link to="/user/profile" className="flex items-center gap-2 px-4 py-2.5 text-[15px] text-slate-600 hover:bg-slate-50 hover:text-[#2563eb] transition-colors">
                                        <span className="material-icons-outlined text-[20px]">manage_accounts</span>
                                        Hồ sơ cá nhân
                                    </Link>
                                    <button
                                        onClick={controller.handleLogout}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 mt-1 text-[15px] text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                        <span className="material-icons-outlined text-[20px]">logout</span>
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Login button
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[14px] font-semibold rounded-xl transition-colors flex items-center gap-2"
                        >
                            <span className="material-icons-outlined text-[18px]">login</span>
                            Đăng nhập
                        </Link>
                    )}
                </div>
            </header >
        </div >
    );
}

export default Header;