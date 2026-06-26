import type { EOrderStatus } from "../../../../client/features/order/enums/orderStatus.enum";
import type { EPaymentMethod } from "../../../../client/features/order/enums/paymentMethod.enum";

export interface OrderStatusHistoryModel {
    id: number;
    orderId: number;
    fromStatus: EOrderStatus | null;
    toStatus: EOrderStatus;
    note: string | null;
    createdAt: string;
    createdBy: string | null;
}

export interface OrderItemAttribute {
    name: string;
    value: string;
}

export interface OrderItemAdminModel {
    id: number;
    productId: number;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    attributes: OrderItemAttribute[];
}

export interface OrderAdminModel {
    id: number;
    totalAmount: number;
    shippingFee: number;
    status: EOrderStatus;
    paymentMethod: EPaymentMethod;
    createdAt: string;
    address: string;
    statusHistory: OrderStatusHistoryModel[];
    items: OrderItemAdminModel[];
}
