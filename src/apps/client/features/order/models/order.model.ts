import { EPaymentMethod } from "../enums/paymentMethod.enum";
import type { Address } from "../../address/models/address.model";
import type { EOrderStatus } from "../enums/orderStatus.enum";

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

export interface OrderItemModel {
    id: number;
    productId: number;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    attributes: OrderItemAttribute[];
    reviewed: boolean;
}

export interface OrderModel {
    id: number;
    totalAmount: number;
    shippingFee: number;
    status: EOrderStatus;
    paymentMethod: EPaymentMethod;
    createdAt: string;
    address: Address;
    statusHistory: OrderStatusHistoryModel[];
    items: OrderItemModel[];
}
