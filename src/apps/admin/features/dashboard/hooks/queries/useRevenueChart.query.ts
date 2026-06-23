import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../../services/dashboard.service";
import { dashboardKeys } from "../dashboard.keys";

export const useRevenueChart = (period: string = "week") => {
    return useQuery({
        queryKey: dashboardKeys.revenueChart(period),
        queryFn: async () => {
            const response = await dashboardService.getRevenueChart(period);
            return response.data;
        },
    });
};
