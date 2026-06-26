import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { OrderStatusDistribution } from "../models/order-status-distribution.model";
import type { RevenueChart } from "../models/revenue-chart.model";
import type { TopCustomer } from "../models/top-customer.model";
import type { TotalOrders } from "../models/total-orders.model";
import type { TotalRevenue } from "../models/total-revenue.model";
import type { DashboardRepo } from "./dashboard.repo";

const ADMIN_DASHBOARD_ENDPOINT = "/admin/dashboard";

export class DashboardApiRepo implements DashboardRepo {
    getTotalRevenue(): Promise<ApiResponse<TotalRevenue>> {
        return apiClient.get<ApiResponse<TotalRevenue>>(`${ADMIN_DASHBOARD_ENDPOINT}/total-revenue`);
    }

    getTotalOrders(): Promise<ApiResponse<TotalOrders>> {
        return apiClient.get<ApiResponse<TotalOrders>>(`${ADMIN_DASHBOARD_ENDPOINT}/total-orders`);
    }

    getOrderStatusDistribution(): Promise<ApiResponse<OrderStatusDistribution>> {
        return apiClient.get<ApiResponse<OrderStatusDistribution>>(`${ADMIN_DASHBOARD_ENDPOINT}/order-status-distribution`);
    }

    getRevenueChart(period: string = "week"): Promise<ApiResponse<RevenueChart>> {
        return apiClient.get<ApiResponse<RevenueChart>>(`${ADMIN_DASHBOARD_ENDPOINT}/revenue-chart`, { params: { period } });
    }

    getTopCustomers(limit: number = 10): Promise<ApiResponse<TopCustomer>> {
        return apiClient.get<ApiResponse<TopCustomer>>(`${ADMIN_DASHBOARD_ENDPOINT}/top-customers`, { params: { limit } });
    }
}
