import { useSearchParams } from "react-router-dom";
import { useOrdersQuery } from "../../../features/orders/hooks/queries/orders.query";

export const useOrderListController = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const page = Number(searchParams.get('page')) || 1;
    const search = searchParams.get('search') || '';
    const limit = 10;

    const { data: ordersData, isLoading, isError, error } = useOrdersQuery(page, limit, search);

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

    return {
        orders: ordersData?.data || [],
        pagination: ordersData?.pagination,
        isLoading,
        isError,
        error,
        page,
        search,
        handlePageChange,
        handleSearch
    };
};
