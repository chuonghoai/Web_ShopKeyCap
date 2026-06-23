import { User, Package, MapPin, Heart, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export const userNavigationItems = [
    { label: 'Hồ sơ', path: '/user/profile', icon: User },
    { label: 'Đơn hàng', path: '/user/orders', icon: Package },
    { label: 'Địa chỉ', path: '/user/addresses', icon: MapPin },
    { label: 'Yêu thích', path: '/user/wishlist', icon: Heart },
    { label: 'Cài đặt', path: '/user/settings', icon: Settings },
];

export const UserSidebar = () => {
    return (
        <nav className="flex md:flex-col gap-2 md:w-64 shrink-0 overflow-x-auto no-scrollbar md:overflow-visible pb-2 md:pb-0">
            {userNavigationItems.map((item) => {
                const Icon = item.icon;
                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap md:whitespace-normal",
                            isActive
                                ? "bg-white shadow-sm text-blue-600 font-medium"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                        )}
                    >
                        <Icon className="w-5 h-5 shrink-0" />
                        <span>{item.label}</span>
                    </NavLink>
                );
            })}
        </nav>
    );
};
