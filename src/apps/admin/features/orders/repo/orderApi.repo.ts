import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { OrderAdminModel } from "../models/order.model";
import type { UpdateOrderStatusRequest } from "../models/update-order-status.request";
import type { CancelOrderRequest } from "../models/cancel-order.request";
import type { OrderRepo } from "./order.repo";

const ADMIN_ORDERS_ENDPOINT = "/admin/orders";

export class OrderApiRepo implements OrderRepo {
    /**
     * GET /admin/orders
     *
     * @Query - page, limit, keyword?
     * @Response - ApiResponse<OrderAdminModel[]>
     * 
     * Mô tả:
     *  - lấy danh sách đơn hàng có phân trang
     *  - keyword là tìm kiếm đơn hàng theo từ khóa, backend có thể tự do chọn logic tìm kiếm
     */
    async getOrders(page: number, limit: number = 20, keyword?: string): Promise<ApiResponse<OrderAdminModel[]>> {
        return apiClient.get<ApiResponse<OrderAdminModel[]>>(ADMIN_ORDERS_ENDPOINT, { params: { page, limit, keyword } });
    }

    /**
     * GET /admin/orders/:id
     *
     * @Param - id
     * @Response - ApiResponse<OrderAdminModel>
     */
    async getOrderDetail(id: number): Promise<ApiResponse<OrderAdminModel>> {
        return apiClient.get<ApiResponse<OrderAdminModel>>(`${ADMIN_ORDERS_ENDPOINT}/${id}`);
    }

    /**
     * PATCH /admin/orders/:id/status
     *
     * @Param - id
     * @Body - status
     * @Response - ApiResponse<OrderAdminModel>
     * 
     * Mô tả:
     *  - Cập nhật trạng thái đơn hàng id, với status mới là request.status
     */
    async updateOrderStatus(request: UpdateOrderStatusRequest): Promise<ApiResponse<OrderAdminModel>> {
        return apiClient.patch<ApiResponse<OrderAdminModel>>(`${ADMIN_ORDERS_ENDPOINT}/${request.id}/status`, { status: request.status });
    }

    /**
     * PATCH /admin/orders/:id/cancel
     *
     * @Param - id
     * @Body - reason
     * @Response - ApiResponse<OrderAdminModel>
     * 
     * Mô tả:
     *  - Hủy đơn hàng id với lý do request.reason
     *  - Chỉ hủy được đơn hàng ở trạng thái PENDING
     */
    async cancelOrder(request: CancelOrderRequest): Promise<ApiResponse<OrderAdminModel>> {
        return apiClient.patch<ApiResponse<OrderAdminModel>>(`${ADMIN_ORDERS_ENDPOINT}/${request.id}/cancel`, { reason: request.reason });
    }
}
