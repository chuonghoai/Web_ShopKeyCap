import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { OrderStatusDistribution } from "../models/order-status-distribution.model";
import type { RevenueChart } from "../models/revenue-chart.model";
import type { TopCustomer } from "../models/top-customer.model";
import type { TotalOrders } from "../models/total-orders.model";
import type { TotalRevenue } from "../models/total-revenue.model";

export interface DashboardRepo {
    getTotalRevenue(): Promise<ApiResponse<TotalRevenue>>;
    getTotalOrders(): Promise<ApiResponse<TotalOrders>>;
    getOrderStatusDistribution(): Promise<ApiResponse<OrderStatusDistribution>>;
    getRevenueChart(period: string): Promise<ApiResponse<RevenueChart>>;
    getTopCustomers(limit: number): Promise<ApiResponse<TopCustomer>>;
}
