import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import { orderKeys } from "../order.keys";
import type { EOrderStatus } from "../../../../../client/features/order/enums/orderStatus.enum";

export const useOrdersQuery = (page: number, limit?: number, keyword?: string, status?: EOrderStatus) => {
    return useQuery({
        queryKey: orderKeys.list({ page, limit, keyword, status }),
        queryFn: async () => {
            const response = await orderService.getOrders(page, limit, keyword, status);
            return response;
        },
    });
};
