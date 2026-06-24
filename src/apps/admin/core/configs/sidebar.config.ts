import { ERole } from "../../../../core/constants/role.constant";

export interface SidebarMenuItem {
    key: string;
    label: string;
    path: string;
    icon?: string;
    roles?: ERole[];
}

export const ADMIN_SIDEBAR_MENU: SidebarMenuItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/admin'
    },
    {
        key: 'products',
        label: 'Sản phẩm',
        path: '/admin/products'
    },
    {
        key: 'orders',
        label: 'Đơn hàng',
        path: '/admin/orders'
    },
    {
        key: 'staffs',
        label: 'Nhân viên',
        path: '/admin/staffs',
        roles: [ERole.ADMIN]
    },
];
