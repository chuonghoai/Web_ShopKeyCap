import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { OrderModel } from "../models/order.model";
import type { OrderRepo } from "./order.repo";
import { EOrderStatus } from "../enums/orderStatus.enum";

export class OrderApiRepo implements OrderRepo {
    async getUserOrders(status?: EOrderStatus): Promise<ApiResponse<OrderModel[]>> {
        const query = status ? `?status=${status}` : '';
        return apiClient.get<ApiResponse<OrderModel[]>>(`/orders/my-orders${query}`);
    }

    async getOrderDetail(orderId: number): Promise<ApiResponse<OrderModel>> {
        return apiClient.get<ApiResponse<OrderModel>>(`/orders/${orderId}`);
    }

    async cancelOrder(orderId: number, reason: string): Promise<ApiResponse<void>> {
        return apiClient.post<ApiResponse<void>>(`/orders/${orderId}/cancel`, { reason });
    }
}
