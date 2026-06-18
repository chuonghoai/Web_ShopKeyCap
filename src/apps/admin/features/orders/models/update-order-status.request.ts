import type { EOrderStatus } from "../../../../client/features/order/enums/orderStatus.enum";

export interface UpdateOrderStatusRequest {
    id: number;
    status: EOrderStatus;
}
