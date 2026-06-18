import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import { orderKeys } from "../order.keys";
import type { CancelOrderRequest } from "../../models/cancel-order.request";

export const useCancelOrderMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CancelOrderRequest) => orderService.cancelOrder(request),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
        },
    });
};
