import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { OrderModel } from "../models/order.model";
import type { OrderRepo } from "./order.repo";
import { EOrderStatus } from "../enums/orderStatus.enum";

export class OrderApiRepo implements OrderRepo {
    /**
     * GET /orders/my-orders/{query}
     * @param status: EOrderStatus
     * @returns OrderModel[]
     * 
     * Mô tả:
     *  - Nếu truyền status: Lọc danh sách đơn hàng theo status
     *  - Nếu không truyền status: Lấy danh sách các đơn hàng có trạng thái PENDING, PREPARING và SHIPPING.
     *      Sắp xếp theo thứ tự PENDING -> PREPARING -> SHIPPING
     */
    async getUserOrders(status?: EOrderStatus): Promise<ApiResponse<OrderModel[]>> {
        const query = status ? `?status=${status}` : '';
        return apiClient.get<ApiResponse<OrderModel[]>>(`/orders/my-orders${query}`);
    }

    /**
     * GET /orders/{orderId}
     * @param orderId: number
     * @returns OrderModel
     * 
     * Mô tả:
     *  - Lấy thông tin chi tiết đơn hàng theo orderId
     */
    async getOrderDetail(orderId: number): Promise<ApiResponse<OrderModel>> {
        return apiClient.get<ApiResponse<OrderModel>>(`/orders/${orderId}`);
    }

    /**
     * POST /orders/{orderId}/cancel
     * @param orderId: number
     * @param reason: string
     * @returns null
     * 
     * Mô tả:
     *  - Hủy đơn hàng theo orderId
     *  - Reason là lý do hủy đơn hàng
     */
    async cancelOrder(orderId: number, reason: string): Promise<ApiResponse<null>> {
        return apiClient.post<ApiResponse<null>>(`/orders/${orderId}/cancel`, { reason });
    }
}
