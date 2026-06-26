import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import { orderKeys } from "../order.keys";

export const useOrderDetailQuery = (id: number) => {
    return useQuery({
        queryKey: orderKeys.detail(id),
        queryFn: async () => {
            const response = await orderService.getOrderDetail(id);
            return response;
        },
        enabled: !!id,
    });
};
