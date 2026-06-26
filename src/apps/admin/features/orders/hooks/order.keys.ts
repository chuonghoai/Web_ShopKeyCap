import type { EOrderStatus } from "../../../../client/features/order/enums/orderStatus.enum";

export const orderKeys = {
    all: ['admin-orders'] as const,
    lists: () => [...orderKeys.all, 'list'] as const,
    list: (params: { page: number; limit?: number; keyword?: string; status?: EOrderStatus }) => [...orderKeys.lists(), params] as const,
    details: () => [...orderKeys.all, 'detail'] as const,
    detail: (id: number) => [...orderKeys.details(), id] as const,
};
