import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import { orderKeys } from "../order.keys";

export const useOrdersQuery = (page: number, limit?: number, keyword?: string) => {
    return useQuery({
        queryKey: orderKeys.list({ page, limit, keyword }),
        queryFn: async () => {
            const response = await orderService.getOrders(page, limit, keyword);
            return response;
        },
    });
};
