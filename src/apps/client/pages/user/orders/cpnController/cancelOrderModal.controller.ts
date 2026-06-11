import { useState } from 'react';
import { useCancelOrderMutation } from '../../../../features/order/hooks/mutations/useCancelOrder.mutation';
import { useToastStore } from '../../../../../../core/store/useToastStore';

export const useCancelOrderModalController = (orderId: number, onClose: () => void) => {
    const toast = useToastStore((state: any) => state.addToast);
    const [selectedReason, setSelectedReason] = useState<string>('');
    const [otherReason, setOtherReason] = useState<string>('');
    const cancelMutation = useCancelOrderMutation();

    const handleConfirm = () => {
        const finalReason = selectedReason === "Khác" ? otherReason : selectedReason;
        
        if (!finalReason.trim()) {
            toast("Vui lòng chọn hoặc nhập lý do hủy đơn", "error");
            return;
        }

        cancelMutation.mutate(
            { orderId, reason: finalReason },
            {
                onSuccess: () => {
                    toast("Đã hủy đơn hàng thành công", "success");
                    onClose();
                },
                onError: (error: any) => {
                    toast(error.message || "Không thể hủy đơn hàng", "error");
                }
            }
        );
    };

    return {
        selectedReason,
        setSelectedReason,
        otherReason,
        setOtherReason,
        handleConfirm,
        isPending: cancelMutation.isPending
    };
};
