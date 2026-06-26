import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../../services/dashboard.service";
import { dashboardKeys } from "../dashboard.keys";

export const useTotalOrders = () => {
    return useQuery({
        queryKey: dashboardKeys.totalOrders(),
        queryFn: async () => {
            const response = await dashboardService.getTotalOrders();
            return response.data;
        },
    });
};
