import type { OrderAdminModel } from '../../../features/orders/models/order.model';
import { getOrderStatusInfo } from '../../../../client/features/order/utils/orderStatus.util';
import { formatDate } from '../../../../../utils/date.util';
import { formatCurrency } from '../../../../../utils/currency.util';

export const useAdminOrderCardViewModel = (order: OrderAdminModel) => {
    const statusInfo = getOrderStatusInfo(order.status);
    const firstItem = order.items[0];
    const moreCount = order.items.length - 1;
    const formattedDate = formatDate(order.createdAt);
    const formattedTotalAmount = formatCurrency(order.totalAmount);

    return {
        statusInfo,
        firstItem,
        moreCount,
        formattedDate,
        formattedTotalAmount
    };
};
