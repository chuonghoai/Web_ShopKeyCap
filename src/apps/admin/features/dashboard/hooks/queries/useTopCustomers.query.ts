import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../../services/dashboard.service";
import { dashboardKeys } from "../dashboard.keys";

export const useTopCustomers = (limit: number = 10) => {
    return useQuery({
        queryKey: dashboardKeys.topCustomers(limit),
        queryFn: async () => {
            const response = await dashboardService.getTopCustomers(limit);
            return response.data;
        },
    });
};
