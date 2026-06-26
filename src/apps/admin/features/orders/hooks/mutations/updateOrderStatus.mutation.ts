import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import { orderKeys } from "../order.keys";
import type { UpdateOrderStatusRequest } from "../../models/update-order-status.request";

export const useUpdateOrderStatusMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: UpdateOrderStatusRequest) => orderService.updateOrderStatus(request),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
        },
    });
};
