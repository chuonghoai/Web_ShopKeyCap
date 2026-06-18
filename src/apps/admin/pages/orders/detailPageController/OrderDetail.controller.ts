import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToastStore } from '../../../../../core/store/useToastStore';
import { useOrderDetailQuery } from '../../../features/orders/hooks/queries/orderDetail.query';
import { useUpdateOrderStatusMutation } from '../../../features/orders/hooks/mutations/updateOrderStatus.mutation';
import { getNextOrderStatus } from '../../../features/orders/utils/nextStatus.util';
import { generateInvoicePDF } from '../../../features/orders/utils/invoice.util';
import { useDocumentTitle } from '../../../../../core/hooks/useDocumentTitle';


export const useOrderDetailController = () => {
    const { id } = useParams();
    const orderId = Number(id);
    const navigate = useNavigate();
    const toast = useToastStore((state: any) => state.addToast);

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const isInvalidId = isNaN(orderId) || orderId <= 0;

    const { data: orderRes, isLoading, error } = useOrderDetailQuery(orderId);
    const order = orderRes?.data;
    useDocumentTitle(order?.id?.toString() + "-" + (order?.items[0]?.productName || ""));

    const updateStatusMutation = useUpdateOrderStatusMutation();

    const handleUpdateStatus = () => {
        if (!order) return;
        const nextStatus = getNextOrderStatus(order.status);
        if (!nextStatus) return;

        updateStatusMutation.mutate(
            { id: order.id, status: nextStatus },
            {
                onSuccess: () => {
                    toast("Cập nhật trạng thái thành công", "success");
                },
                onError: (err: any) => {
                    toast(err.message || "Lỗi khi cập nhật trạng thái", "error");
                }
            }
        );
    };

    const handlePrintInvoice = () => {
        if (!order) return;
        try {
            generateInvoicePDF(order);
        } catch (error: any) {
            toast(error?.message || error?.data?.message || "Không thể tạo hóa đơn", "error");
            console.log(error)
        }
    };

    return {
        order,
        isLoading,
        error,
        isInvalidId,
        orderId,
        isCancelModalOpen,
        setIsCancelModalOpen,
        handleUpdateStatus,
        handlePrintInvoice,
        isUpdatingStatus: updateStatusMutation.isPending,
        navigate
    };
};
