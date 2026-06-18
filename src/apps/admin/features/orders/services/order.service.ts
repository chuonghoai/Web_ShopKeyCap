import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { OrderRepo } from "../repo/order.repo";
import { OrderApiRepo } from "../repo/orderApi.repo";
import { OrderMockRepo } from "../repo/orderMock.repo";
import type { UpdateOrderStatusRequest } from "../models/update-order-status.request";
import type { CancelOrderRequest } from "../models/cancel-order.request";

export class OrderService {
    private readonly repo: OrderRepo;

    constructor(orderRepo: OrderRepo) {
        this.repo = orderRepo;
    }

    async getOrders(page: number, limit?: number, keyword?: string) {
        return this.repo.getOrders(page, limit, keyword);
    }

    async getOrderDetail(id: number) {
        return this.repo.getOrderDetail(id);
    }

    async updateOrderStatus(request: UpdateOrderStatusRequest) {
        return this.repo.updateOrderStatus(request);
    }

    async cancelOrder(request: CancelOrderRequest) {
        return this.repo.cancelOrder(request);
    }
}

export const orderService = new OrderService(USE_MOCK ? new OrderMockRepo() : new OrderApiRepo());
