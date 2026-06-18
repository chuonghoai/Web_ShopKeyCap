import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { OrderAdminModel } from "../models/order.model";
import type { UpdateOrderStatusRequest } from "../models/update-order-status.request";
import type { CancelOrderRequest } from "../models/cancel-order.request";
import type { OrderRepo } from "./order.repo";

export class OrderMockRepo implements OrderRepo {
    getOrders(page: number, limit: number = 20, keyword?: string): Promise<ApiResponse<OrderAdminModel[]>> {
        return Promise.resolve({
            success: true,
            message: "Success",
            data: [],
            pagination: {
                page,
                pageSize: limit,
                totalItems: 0,
                totalPages: 0,
            }
        });
    }

    getOrderDetail(id: number): Promise<ApiResponse<OrderAdminModel>> {
        return Promise.resolve({
            success: true,
            message: "Success",
            data: {} as OrderAdminModel,
        });
    }

    updateOrderStatus(request: UpdateOrderStatusRequest): Promise<ApiResponse<OrderAdminModel>> {
        return Promise.resolve({
            success: true,
            message: "Success",
            data: {} as OrderAdminModel,
        });
    }

    cancelOrder(request: CancelOrderRequest): Promise<ApiResponse<OrderAdminModel>> {
        return Promise.resolve({
            success: true,
            message: "Success",
            data: {} as OrderAdminModel,
        });
    }
}
