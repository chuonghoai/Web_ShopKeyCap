export interface CustomerStat {
    userId: number;
    fullName: string;
    email: string;
    totalOrders: number;
    totalSpent: number;
}

export interface TopCustomer {
    customers: CustomerStat[];
}
