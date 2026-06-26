import type { OrderModel } from '../../../../features/order/models/order.model';
import { getOrderStatusInfo } from '../../../../features/order/utils/orderStatus.util';
import { getPaymentMethodConfig } from '../../../../features/order/config/paymentMethod.config';
import { EOrderStatus } from '../../../../features/order/enums/orderStatus.enum';

export const useOrderDetailViewModel = (order?: OrderModel) => {
    if (!order) return null;

    const statusInfo = getOrderStatusInfo(order.status);
    const paymentConfig = getPaymentMethodConfig(order.paymentMethod);
    const canCancel = order.status === EOrderStatus.PENDING;

    return {
        statusInfo,
        paymentConfig,
        canCancel
    };
};
