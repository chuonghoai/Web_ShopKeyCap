import { useState } from "react";
import { useRevenueChart } from "../../../features/dashboard";

export const useRevenueChartController = () => {
    const [period, setPeriod] = useState<string>("week");
    
    const { data, isLoading, isError } = useRevenueChart(period);

    const formattedData = data?.labels.map((label, index) => ({
        label,
        value: data.data[index]
    })) || [];

    return {
        period,
        setPeriod,
        data: formattedData,
        isLoading,
        isError
    };
};
