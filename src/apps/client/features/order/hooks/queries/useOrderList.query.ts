import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import { orderKeys } from "../orderKeys";
import { EOrderStatus } from "../../enums/orderStatus.enum";

export const useOrderListQuery = (status?: EOrderStatus) => {
    return useQuery({
        queryKey: orderKeys.list(status),
        queryFn: async () => {
            const res = await orderService.getUserOrders(status);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        staleTime: 60000, // 1 min
        gcTime: 300000,   // 5 min
    });
};
