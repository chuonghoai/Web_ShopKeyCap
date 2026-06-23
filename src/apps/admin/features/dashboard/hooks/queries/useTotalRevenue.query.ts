import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../../services/dashboard.service";
import { dashboardKeys } from "../dashboard.keys";

export const useTotalRevenue = () => {
    return useQuery({
        queryKey: dashboardKeys.totalRevenue(),
        queryFn: async () => {
            const response = await dashboardService.getTotalRevenue();
            return response.data;
        },
    });
};
