import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToastStore } from '../../../../core/store/useToastStore';
import { EPaymentMethod } from '../../features/order/enums/paymentMethod.enum';
import { usePrepareOrderQuery } from '../../features/order/hooks/queries/usePrepareOrder.query';
import { useDeliveryInfoQuery } from '../../features/profile/hooks/queries/useDeliveryInfo.query';
import { useCheckoutOrderMutation } from '../../features/order/hooks/mutations/useCheckoutOrder.mutation';
import type { CheckoutRequest } from '../../features/order/dto/checkout.request';
import type { CheckoutLocationState } from '../../features/order/types/checkoutLocation.type';

export const useOrderCheckoutController = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const addToast = useToastStore(state => state.addToast);

    const state = location.state as CheckoutLocationState | null;
    const items = state?.items || [];
    const cartItemIds = state?.cartItemIds || [];

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<EPaymentMethod>(EPaymentMethod.COD);

    // Modal states
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

    // Queries
    const {
        data: preparedData,
        isLoading: loadingPreparedData,
        error: prepareError
    } = usePrepareOrderQuery(items);

    const {
        data: deliveryInfo,
        isLoading: loadingDelivery
    } = useDeliveryInfoQuery();

    // Redirect to home if no items
    useEffect(() => {
        if (!items || items.length === 0) {
            addToast('Không có sản phẩm để thanh toán', 'error');
            navigate('/cart');
        }
    }, [items, navigate, addToast]);

    useEffect(() => {
        if (prepareError) {
            addToast('Có lỗi xảy ra khi tải thông tin đơn hàng', 'error');
            navigate('/cart');
        }
    }, [prepareError, navigate, addToast]);

    // Mutation
    const checkoutMutation = useCheckoutOrderMutation();

    const handleCheckout = () => {
        if (!deliveryInfo?.address?.id) {
            addToast('Vui lòng thêm địa chỉ giao hàng', 'warning');
            return;
        }

        const request: CheckoutRequest = {
            paymentMethod: selectedPaymentMethod,
            addressId: deliveryInfo.address.id,
            items: items.map(item => ({
                variantId: item.variantId,
                quantity: item.quantity
            })),
            cartItemIds: cartItemIds.length > 0 ? cartItemIds.map(id => ({ id })) : undefined
        };

        checkoutMutation.mutate(request, {
            onSuccess: () => {
                addToast('Đặt hàng thành công', 'success');
                // TODO: Redirect to order success/result page, for now redirect to home or order history
            },
            onError: (err: any) => {
                addToast(err.message || 'Đặt hàng thất bại, vui lòng thử lại', 'error');
            }
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    const formatDate = (isoString?: string) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    };

    return {
        // Data
        preparedData,
        deliveryInfo,

        // State
        selectedPaymentMethod,
        isSubmitting: checkoutMutation.isPending,
        isLoading: loadingPreparedData || loadingDelivery,
        isPaymentModalOpen,
        isVoucherModalOpen,

        // Handlers
        setSelectedPaymentMethod,
        setIsPaymentModalOpen,
        setIsVoucherModalOpen,
        handleCheckout,
        formatPrice,
        formatDate
    };
};
