export interface SidebarMenuItem {
    key: string;
    label: string;
    path: string;
    icon?: string;
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
        key: 'users',
        label: 'Người dùng',
        path: '/admin/users'
    },
    {
        key: 'orders',
        label: 'Đơn hàng',
        path: '/admin/orders'
    }
];
