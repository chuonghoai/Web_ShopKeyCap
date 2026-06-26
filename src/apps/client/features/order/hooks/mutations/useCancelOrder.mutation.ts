import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import { orderKeys } from "../orderKeys";

export const useCancelOrderMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ orderId, reason }: { orderId: number, reason: string }) => {
            const res = await orderService.cancelOrder(orderId, reason);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        onSuccess: (_, { orderId }) => {
            // Invalidate order list and detail to refetch
            queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
            queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
        }
    });
};
