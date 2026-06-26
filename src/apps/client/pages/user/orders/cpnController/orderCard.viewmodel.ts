import type { OrderModel } from '../../../../features/order/models/order.model';
import { getOrderStatusInfo } from '../../../../features/order/utils/orderStatus.util';
import { formatCurrency } from '../../../../../../utils/currency.util';
import { formatDate } from '../../../../../../utils/date.util';

export const useOrderCardViewModel = (order: OrderModel) => {
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
