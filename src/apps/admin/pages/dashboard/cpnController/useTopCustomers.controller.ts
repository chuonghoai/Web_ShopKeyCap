import { useState } from "react";
import { useTopCustomers } from "../../../features/dashboard";

export const useTopCustomersController = () => {
    const [limit, setLimit] = useState(5);
    const { data, isLoading, isError } = useTopCustomers(limit);

    return {
        customers: data?.customers || [],
        isLoading,
        isError,
        limit,
        setLimit
    };
};
