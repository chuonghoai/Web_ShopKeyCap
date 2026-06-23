import { EOrderStatus } from "../../../../client/features/order/enums/orderStatus.enum";

export interface StatusCount {
    status: EOrderStatus;
    count: number;
}

export interface OrderStatusDistribution {
    distribution: StatusCount[];
}
