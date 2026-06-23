import { useOrderStatusDistribution } from "../../../features/dashboard";

const STATUS_COLORS: Record<string, string> = {
    PENDING: "#f59e0b",
    PREPARING: "#3b82f6",
    SHIPPING: "#8b5cf6",
    SUCCESS: "#10b981",
    CANCELLED: "#ef4444",
    RETURNED: "#64748b"
};

export const useOrderStatusController = () => {
    const { data, isLoading, isError } = useOrderStatusDistribution();

    const formattedData = data?.distribution.map(item => ({
        name: item.status,
        value: item.count,
        color: STATUS_COLORS[item.status] || "#94a3b8"
    })) || [];

    return {
        data: formattedData,
        isLoading,
        isError
    };
};
