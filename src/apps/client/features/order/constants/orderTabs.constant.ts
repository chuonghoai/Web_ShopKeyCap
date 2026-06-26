import { EOrderFilterTab } from '../enums/orderFilterTab.enum';
import { EOrderStatus } from '../enums/orderStatus.enum';

export const ORDER_TABS = [
    { id: EOrderFilterTab.ALL, label: 'Tất cả' },
    { id: EOrderStatus.PENDING, label: 'Chờ xử lý' },
    { id: EOrderStatus.PREPARING, label: 'Đang chuẩn bị' },
    { id: EOrderStatus.SHIPPING, label: 'Đang giao' },
    { id: EOrderStatus.SUCCESS, label: 'Đã giao' },
    { id: EOrderStatus.CANCELLED, label: 'Đã hủy' }
];
