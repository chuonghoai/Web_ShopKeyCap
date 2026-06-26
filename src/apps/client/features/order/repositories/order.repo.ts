import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { OrderModel } from "../models/order.model";
import { EOrderStatus } from "../enums/orderStatus.enum";

export interface OrderRepo {
    getUserOrders(status?: EOrderStatus): Promise<ApiResponse<OrderModel[]>>;
    getOrderDetail(orderId: number): Promise<ApiResponse<OrderModel>>;
    cancelOrder(orderId: number, reason: string): Promise<ApiResponse<null>>;
}
