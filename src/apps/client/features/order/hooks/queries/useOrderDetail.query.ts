import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import { orderKeys } from "../orderKeys";

export const useOrderDetailQuery = (orderId: number) => {
    return useQuery({
        queryKey: orderKeys.detail(orderId),
        queryFn: async () => {
            const res = await orderService.getOrderDetail(orderId);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        enabled: !!orderId,
    });
};
