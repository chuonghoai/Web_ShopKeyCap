import { EOrderFilterTab } from "../../../../client/features/order/enums/orderFilterTab.enum";
import { EOrderStatus } from "../../../../client/features/order/enums/orderStatus.enum";
import { ORDER_TABS } from "../../../../client/features/order/constants/orderTabs.constant";

/**
 * Phân tích và map chuỗi status từ UI (URL, param) thành EOrderStatus hợp lệ cho Backend.
 * - Nếu statusStr là null/undefined hoặc EOrderFilterTab.ALL -> undefined (nghĩa là "Tất cả")
 * - Nếu statusStr không thuộc ORDER_TABS hoặc EOrderStatus hợp lệ -> undefined
 * - Ngược lại -> trả về EOrderStatus tương ứng
 */
export const parseOrderStatusQuery = (statusStr: string | null): EOrderStatus | undefined => {
    if (!statusStr || statusStr === EOrderFilterTab.ALL) {
        return undefined;
    }

    const isValidTab = ORDER_TABS.some(tab => tab.id === statusStr);
    
    if (isValidTab && Object.values(EOrderStatus).includes(statusStr as EOrderStatus)) {
        return statusStr as EOrderStatus;
    }

    return undefined;
};
