import { useSearchParams } from "react-router-dom";
import { useOrdersQuery } from "../../../features/orders/hooks/queries/orders.query";
import { parseOrderStatusQuery } from "../../../features/orders/utils/orderFilter.util";
import { EOrderFilterTab } from "../../../../client/features/order/enums/orderFilterTab.enum";

export const useOrderListController = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const page = Number(searchParams.get('page')) || 1;
    const search = searchParams.get('search') || '';
    const activeTab = searchParams.get('status') || EOrderFilterTab.ALL;
    const limit = 10;

    const queryStatus = parseOrderStatusQuery(activeTab);

    const { data: ordersData, isLoading, isError, error } = useOrdersQuery(page, limit, search, queryStatus);

    const handlePageChange = (newPage: number) => {
        searchParams.set('page', newPage.toString());
        setSearchParams(searchParams);
    };

    const handleSearch = (newSearch: string) => {
        if (newSearch) {
            searchParams.set('search', newSearch);
        } else {
            searchParams.delete('search');
        }
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    };

    const handleTabChange = (newTabId: string) => {
        if (newTabId === EOrderFilterTab.ALL) {
            searchParams.delete('status');
        } else {
            searchParams.set('status', newTabId);
        }
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    };

    return {
        orders: ordersData?.data || [],
        pagination: ordersData?.pagination,
        isLoading,
        isError,
        error,
        page,
        search,
        activeTab,
        handlePageChange,
        handleSearch,
        handleTabChange
    };
};
