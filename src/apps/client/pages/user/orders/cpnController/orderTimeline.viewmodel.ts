import type { OrderStatusHistoryModel } from '../../../../features/order/models/order.model';
import { getOrderStatusInfo } from '../../../../features/order/utils/orderStatus.util';
import { formatDateTime } from '../../../../../../utils/date.util';

export const useOrderTimelineViewModel = (history: OrderStatusHistoryModel[]) => {
    const sortedHistory = [...history].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    const timelineItems = sortedHistory.map((h, index) => {
        const isLast = index === sortedHistory.length - 1;
        const statusInfo = getOrderStatusInfo(h.toStatus);
        const formattedDate = formatDateTime(h.createdAt);
        
        return {
            ...h,
            isLast,
            statusInfo,
            formattedDate
        };
    });

    return {
        timelineItems
    };
};
