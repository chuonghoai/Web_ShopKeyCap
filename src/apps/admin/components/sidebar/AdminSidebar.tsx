import React, { useState } from "react";
import { ADMIN_SIDEBAR_MENU } from "../../core/configs/sidebar.config";
import { useAdminSidebarController } from "./AdminSidebar.controller";

export const AdminSidebar: React.FC = () => {
    const { user, isActive, handleNavigate, handleLogout } = useAdminSidebarController();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 shrink-0 flex flex-col h-full border-r border-slate-800">
            {/* Logo & Website Name */}
            <div className="h-16 flex items-center justify-center gap-2 border-b border-slate-800">
                <img src="/src/assets/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                <span className="font-bold text-xl text-white">Cyber Key</span>
            </div>

            {/* Menu List */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                    {ADMIN_SIDEBAR_MENU.filter(item => !item.roles || (user?.role && item.roles.includes(user.role))).map((item) => (
                        <li key={item.key}>
                            <button
                                onClick={() => handleNavigate(item.path)}
                                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors text-left font-medium ${
                                    isActive(item.path)
                                        ? "bg-slate-800 text-white shadow-sm"
                                        : "hover:bg-slate-800/50 hover:text-white"
                                }`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User Profile / Footer */}
            <div className="p-4 border-t border-slate-800 relative">
                {isDropdownOpen && (
                    <div className="absolute bottom-full left-4 right-4 mb-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden text-sm">
                        <button className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors">
                            Cài đặt
                        </button>
                        <button className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors">
                            Hướng dẫn sử dụng
                        </button>
                        <div className="h-px bg-slate-700 my-1"></div>
                        <button 
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-red-400 hover:bg-slate-700 transition-colors"
                        >
                            Đăng xuất
                        </button>
                    </div>
                )}
                
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-left"
                >
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white overflow-hidden shrink-0">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="font-bold text-lg">{user?.fullName?.charAt(0).toUpperCase() || 'A'}</span>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{user?.fullName || 'Admin'}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@shop.com'}</p>
                    </div>
                </button>
            </div>
        </aside>
    );
};
