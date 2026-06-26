import { EOrderStatus } from "../../../../client/features/order/enums/orderStatus.enum";

export const getNextOrderStatus = (currentStatus: EOrderStatus): EOrderStatus | null => {
    switch (currentStatus) {
        case EOrderStatus.PENDING:
            return EOrderStatus.PREPARING;
        case EOrderStatus.PREPARING:
            return EOrderStatus.SHIPPING;
        case EOrderStatus.SHIPPING:
            return EOrderStatus.SUCCESS;
        case EOrderStatus.SUCCESS:
            return EOrderStatus.RETURNED;
        default:
            return null;
    }
};

export const getNextOrderStatusLabel = (nextStatus: EOrderStatus | null): string => {
    switch (nextStatus) {
        case EOrderStatus.PREPARING:
            return "Chuẩn bị hàng";
        case EOrderStatus.SHIPPING:
            return "Giao hàng";
        case EOrderStatus.SUCCESS:
            return "Hoàn thành";
        case EOrderStatus.RETURNED:
            return "Xác nhận trả hàng";
        default:
            return "";
    }
};
