import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToastStore } from '../../../../core/store/useToastStore';
import { EPaymentMethod } from '../../features/order/enums/paymentMethod.enum';
import { usePrepareOrderQuery } from '../../features/order/hooks/queries/usePrepareOrder.query';
import { useCheckoutOrderMutation } from '../../features/order/hooks/mutations/useCheckoutOrder.mutation';
import type { CheckoutRequest } from '../../features/order/dto/checkout.request';
import type { CheckoutLocationState } from '../../features/order/types/checkoutLocation.type';
import { useDeliveryInfoQuery } from '../../features/address/hooks/queries/useDeliveryInfo.query';

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
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>();

    // Queries
    const {
        data: preparedData,
        isLoading: loadingPreparedData,
        error: prepareError
    } = usePrepareOrderQuery(items, selectedAddressId);

    const {
        data: deliveryInfo,
        isLoading: loadingDelivery,
        error: deliveryError
    } = useDeliveryInfoQuery(selectedAddressId);

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

    useEffect(() => {
        if (deliveryError) {
            addToast('Không thể lấy thông tin vận chuyển. Vui lòng thử lại.', 'error');
        }
    }, [deliveryError, addToast]);

    // Mutation
    const checkoutMutation = useCheckoutOrderMutation();

    const handleCheckout = () => {
        const addressId = selectedAddressId || deliveryInfo?.address?.id;
        if (!addressId) {
            addToast('Vui lòng thêm địa chỉ giao hàng', 'warning');
            return;
        }

        const request: CheckoutRequest = {
            paymentMethod: selectedPaymentMethod,
            addressId: addressId,
            items: items.map(item => ({
                variantId: item.variantId,
                quantity: item.quantity
            })),
            cartItemIds: cartItemIds.length > 0 ? cartItemIds.map(id => ({ id })) : undefined
        };

        checkoutMutation.mutate(request, {
            onSuccess: (data) => {
                addToast('Đặt hàng thành công', 'success');
                if (data.paymentRequired && data.payUrl) {
                    window.location.href = data.payUrl;
                } else {
                    navigate(`/order/checkout/result?orderId=${data.orderId}`);
                }
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

    const handleSelectAddress = (address: any) => {
        setSelectedAddressId(address.id);
        setIsAddressModalOpen(false);
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
        isAddressModalOpen,
        selectedAddressId,

        // Handlers
        setSelectedPaymentMethod,
        setIsPaymentModalOpen,
        setIsVoucherModalOpen,
        setIsAddressModalOpen,
        handleSelectAddress,
        handleCheckout,
        formatPrice,
        formatDate
    };
};
