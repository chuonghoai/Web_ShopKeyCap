import { useState } from 'react';
import { useOrderListQuery } from '../../../../features/order/hooks/queries/useOrderList.query';
import { EOrderFilterTab } from '../../../../features/order/enums/orderFilterTab.enum';
import { EOrderStatus } from '../../../../features/order/enums/orderStatus.enum';

export const useOrderListController = () => {
    const [activeTab, setActiveTab] = useState<EOrderFilterTab>(EOrderFilterTab.ALL);
    
    // Convert ALL to undefined, otherwise pass the status
    const queryStatus = activeTab === EOrderFilterTab.ALL ? undefined : (activeTab as EOrderStatus);

    const { data: orders, isLoading } = useOrderListQuery(queryStatus);

    return {
        activeTab,
        setActiveTab,
        orders,
        isLoading
    };
};
