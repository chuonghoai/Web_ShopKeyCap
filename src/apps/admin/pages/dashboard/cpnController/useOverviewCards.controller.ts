import { useTotalOrders, useTotalRevenue } from "../../../features/dashboard";

export const useOverviewCardsController = () => {
    const { data: revenueData, isLoading: isLoadingRevenue, isError: isErrorRevenue } = useTotalRevenue();
    const { data: ordersData, isLoading: isLoadingOrders, isError: isErrorOrders } = useTotalOrders();

    return {
        revenueData,
        ordersData,
        isLoading: isLoadingRevenue || isLoadingOrders,
        isError: isErrorRevenue || isErrorOrders
    };
};
