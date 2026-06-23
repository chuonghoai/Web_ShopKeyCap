export const dashboardKeys = {
    all: ['dashboard'] as const,
    totalRevenue: () => [...dashboardKeys.all, 'total-revenue'] as const,
    totalOrders: () => [...dashboardKeys.all, 'total-orders'] as const,
    orderStatusDistribution: () => [...dashboardKeys.all, 'order-status-distribution'] as const,
    revenueChart: (period: string) => [...dashboardKeys.all, 'revenue-chart', period] as const,
    topCustomers: (limit: number) => [...dashboardKeys.all, 'top-customers', limit] as const,
};
