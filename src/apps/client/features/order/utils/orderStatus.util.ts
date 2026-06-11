import { EOrderStatus } from "../enums/orderStatus.enum";

export interface StatusInfo {
    label: string;
    icon: string;
    colorClass: string;
    bgClass: string;
}

export const STATUS_CONFIG: Record<EOrderStatus, StatusInfo> = {
    [EOrderStatus.PENDING]: { label: 'Chờ xử lý', icon: 'schedule', colorClass: 'text-amber-600', bgClass: 'bg-amber-50' },
    [EOrderStatus.PREPARING]: { label: 'Đang chuẩn bị hàng', icon: 'inventory_2', colorClass: 'text-blue-600', bgClass: 'bg-blue-50' },
    [EOrderStatus.SHIPPING]: { label: 'Đang giao hàng', icon: 'local_shipping', colorClass: 'text-indigo-600', bgClass: 'bg-indigo-50' },
    [EOrderStatus.SUCCESS]: { label: 'Giao hàng thành công', icon: 'check_circle', colorClass: 'text-emerald-600', bgClass: 'bg-emerald-50' },
    [EOrderStatus.CANCELLED]: { label: 'Đã hủy', icon: 'cancel', colorClass: 'text-rose-600', bgClass: 'bg-rose-50' },
    [EOrderStatus.RETURNED]: { label: 'Yêu cầu trả hàng', icon: 'close', colorClass: 'text-rose-600', bgClass: 'bg-rose-50' },
};

export const getOrderStatusInfo = (status: EOrderStatus): StatusInfo => {
    return STATUS_CONFIG[status] || { label: 'Không xác định', icon: 'help_outline', colorClass: 'text-slate-600', bgClass: 'bg-slate-50' };
};
