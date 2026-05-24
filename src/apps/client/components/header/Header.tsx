import { Link } from "react-router-dom";
import { useCart } from "../../features/cart/hooks/useCart";
import { useHeaderController } from "./header.controller";

function Header() {
    const { cartCount } = useCart();

    // Gọi controller để lấy state và hàm xử lý
    const { user, handleLogout } = useHeaderController();

    return (
        <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* LOGO */}
                <Link to="/" className="text-[24px] font-bold text-white tracking-wider flex items-center gap-2">
                    <span className="text-blue-500">CYBER</span>KEYS
                </Link>

                {/* NAVIGATION */}
                <nav className="hidden md:flex gap-8 text-[16px] font-medium">
                    <Link to="/" className="hover:text-blue-400 transition-colors">Trang chủ</Link>
                    <Link to="/products" className="hover:text-blue-400 transition-colors">Sản phẩm</Link>
                    <Link to="/about" className="hover:text-blue-400 transition-colors">Giới thiệu</Link>
                </nav>

                {/* ACTIONS */}
                <div className="flex items-center gap-4">

                    {/* Giỏ hàng */}
                    <Link to="/cart" className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
                        <span className="material-icons-outlined">shopping_cart</span>
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 w-5 h-5 bg-blue-500 text-white text-[13px] rounded-full flex items-center justify-center font-medium shadow-md shadow-blue-500/50">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Vùng Tài Khoản có Dropdown Hover */}
                    <div className="relative group">
                        {/* Nút chính */}
                        <Link
                            to={user ? "/profile" : "/login"}
                            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-[14px] font-semibold text-slate-200 rounded-lg transition-colors flex items-center gap-2 border border-slate-700/50"
                        >
                            <span className="material-icons-outlined text-[18px]">person</span>
                            {user ? 'Tài khoản' : 'Đăng nhập'}
                        </Link>

                        {/* Dropdown Menu (Chỉ hiện khi đã đăng nhập và hover vào div cha) */}
                        {user && (
                            <div className="absolute right-0 top-full pt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden flex flex-col py-1">

                                    <div className="px-4 py-2 border-b border-slate-800 mb-1">
                                        <p className="text-[13px] text-slate-400">Xin chào,</p>
                                        <p className="text-[14px] font-semibold text-white truncate">
                                            {/* Giả định user có trường name hoặc email */}
                                            {user.fullName || "Khách hàng"}
                                        </p>
                                    </div>

                                    <Link to="/profile" className="px-4 py-2 text-[14px] text-slate-300 hover:bg-slate-800 hover:text-blue-400 transition-colors flex items-center gap-2">
                                        <span className="material-icons-outlined text-[18px]">manage_accounts</span>
                                        Hồ sơ cá nhân
                                    </Link>

                                    <Link to="/orders" className="px-4 py-2 text-[14px] text-slate-300 hover:bg-slate-800 hover:text-blue-400 transition-colors flex items-center gap-2">
                                        <span className="material-icons-outlined text-[18px]">receipt_long</span>
                                        Đơn hàng của tôi
                                    </Link>

                                    <div className="h-px bg-slate-800 w-full my-1"></div>

                                    {/* Nút Đăng xuất gọi tới Controller */}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-[14px] text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors flex items-center gap-2"
                                    >
                                        <span className="material-icons-outlined text-[18px]">logout</span>
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;