import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { OrderAdminModel } from "../models/order.model";
import type { UpdateOrderStatusRequest } from "../models/update-order-status.request";
import type { CancelOrderRequest } from "../models/cancel-order.request";
import type { EOrderStatus } from "../../../../client/features/order/enums/orderStatus.enum";

export interface OrderRepo {
    getOrders(page: number, limit?: number, keyword?: string, status?: EOrderStatus): Promise<ApiResponse<OrderAdminModel[]>>;
    getOrderDetail(id: number): Promise<ApiResponse<OrderAdminModel>>;
    updateOrderStatus(request: UpdateOrderStatusRequest): Promise<ApiResponse<OrderAdminModel>>;
    cancelOrder(request: CancelOrderRequest): Promise<ApiResponse<OrderAdminModel>>;
}
