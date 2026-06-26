import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { OrderModel } from "../models/order.model";
import { EOrderStatus } from "../enums/orderStatus.enum";
import type { OrderRepo } from "../repositories/order.repo";
import { OrderApiRepo } from "../repositories/orderApi.repo";
import { OrderMockRepo } from "../repositories/orderMock.repo";

export class OrderService {
    private readonly repo: OrderRepo;
    
    constructor(repo: OrderRepo) {
        this.repo = repo;
    }

    async getUserOrders(status?: EOrderStatus): Promise<ApiResponse<OrderModel[]>> {
        return this.repo.getUserOrders(status);
    }

    async getOrderDetail(orderId: number): Promise<ApiResponse<OrderModel>> {
        return this.repo.getOrderDetail(orderId);
    }

    async cancelOrder(orderId: number, reason: string): Promise<ApiResponse<void>> {
        return this.repo.cancelOrder(orderId, reason);
    }
}

export const orderService = new OrderService(USE_MOCK ? new OrderMockRepo() : new OrderApiRepo());
