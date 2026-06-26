import type { DashboardRepo } from "../repo/dashboard.repo";
import { DashboardApiRepo } from "../repo/dashboardApi.repo";

export class DashboardService {
    private readonly repo: DashboardRepo;

    constructor(dashboardRepo: DashboardRepo) {
        this.repo = dashboardRepo;
    }

    async getTotalRevenue() {
        return this.repo.getTotalRevenue();
    }

    async getTotalOrders() {
        return this.repo.getTotalOrders();
    }

    async getOrderStatusDistribution() {
        return this.repo.getOrderStatusDistribution();
    }

    async getRevenueChart(period: string) {
        return this.repo.getRevenueChart(period);
    }

    async getTopCustomers(limit: number) {
        return this.repo.getTopCustomers(limit);
    }
}

export const dashboardService = new DashboardService(new DashboardApiRepo());
