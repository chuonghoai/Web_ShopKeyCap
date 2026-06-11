import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrderDetailQuery } from '../../../../features/order/hooks/queries/useOrderDetail.query';

export const useOrderDetailController = () => {
    const { id } = useParams();
    const orderId = Number(id);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const isInvalidId = isNaN(orderId) || orderId <= 0;

    const { data: order, isLoading, error } = useOrderDetailQuery(orderId);

    return {
        order,
        isLoading,
        error,
        isInvalidId,
        orderId,
        isCancelModalOpen,
        setIsCancelModalOpen
    };
};
