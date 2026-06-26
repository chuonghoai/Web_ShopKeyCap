import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../../services/dashboard.service";
import { dashboardKeys } from "../dashboard.keys";

export const useOrderStatusDistribution = () => {
    return useQuery({
        queryKey: dashboardKeys.orderStatusDistribution(),
        queryFn: async () => {
            const response = await dashboardService.getOrderStatusDistribution();
            return response.data;
        },
    });
};
