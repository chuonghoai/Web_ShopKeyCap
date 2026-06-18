import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { OrderAdminModel } from "../models/order.model";
import type { UpdateOrderStatusRequest } from "../models/update-order-status.request";
import type { CancelOrderRequest } from "../models/cancel-order.request";
import type { OrderRepo } from "./order.repo";
import type { EOrderStatus } from "../../../../client/features/order/enums/orderStatus.enum";

const ADMIN_ORDERS_ENDPOINT = "/admin/orders";

export class OrderApiRepo implements OrderRepo {
    /**
     * GET /admin/orders
     *
     * @Query - page, limit, status, keyword?
     * @Response - ApiResponse<OrderAdminModel[]>
     * 
     * Mô tả:
     *  - lấy danh sách đơn hàng có phân trang
     *  - keyword là tìm kiếm đơn hàng theo từ khóa, backend có thể tự do chọn logic tìm kiếm
     */
    async getOrders(page: number, limit: number = 20, keyword?: string, status?: EOrderStatus): Promise<ApiResponse<OrderAdminModel[]>> {
        return apiClient.get<ApiResponse<OrderAdminModel[]>>(ADMIN_ORDERS_ENDPOINT, { params: { page, limit, keyword, status } });
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
     *  - Mỗi khi cập nhật trạng thái, cần dựa vào new status để tạo note cho status history phù hợp
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
     *  - Hủy đơn hàng id với lý do request.reason (là note trong bảng status history)
     *  - Chỉ hủy được đơn hàng ở trạng thái PENDING
     *  - cần cập nhật vào status history với statusCANCELLED và note là lý do hủy đơn hàng
     */
    async cancelOrder(request: CancelOrderRequest): Promise<ApiResponse<OrderAdminModel>> {
        return apiClient.patch<ApiResponse<OrderAdminModel>>(`${ADMIN_ORDERS_ENDPOINT}/${request.id}/cancel`, { reason: request.reason });
    }
}
