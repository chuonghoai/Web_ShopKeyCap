import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { OrderModel } from "../models/order.model";
import type { OrderRepo } from "./order.repo";
import { EPaymentMethod } from "../enums/paymentMethod.enum";
import { EOrderStatus } from "../enums/orderStatus.enum";

const MOCK_ORDERS: OrderModel[] = [
    {
        id: 10001,
        totalAmount: 320000,
        shippingFee: 30000,
        status: EOrderStatus.PENDING,
        paymentMethod: EPaymentMethod.COD,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        address: {
            id: 1,
            fullName: "Nguyễn Văn A",
            phone: "0123456789",
            province: { code: "01", name: "Hà Nội" },
            district: { code: "001", name: "Quận Ba Đình" },
            ward: { code: "00001", name: "Phường Phúc Xá" },
            street: "Số 1 Đường ABC",
            fullAddress: "Số 1 Đường ABC, Phường Phúc Xá, Quận Ba Đình, Hà Nội",
            isDefault: true
        },
        statusHistory: [
            {
                id: 1,
                orderId: 10001,
                fromStatus: null,
                toStatus: EOrderStatus.PENDING,
                note: null,
                createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                createdBy: "Nguyễn Văn A"
            }
        ],
        items: [
            {
                id: 1,
                productId: 1,
                productName: "Bàn phím cơ Akko Mod007 PC",
                productImage: "https://placehold.co/150x150/e2e8f0/64748b?text=Akko",
                quantity: 2,
                price: 100000,
                attributes: [{ name: "Màu sắc", value: "Botanical" }, { name: "Profile", value: "Cherry" }],
                reviewed: false
            },
            {
                id: 2,
                productId: 2,
                productName: "Bộ Keycap PBT Cherry Profile",
                productImage: "https://placehold.co/150x150/e2e8f0/64748b?text=Keycap",
                quantity: 1,
                price: 90000,
                attributes: [{ name: "Màu sắc", value: "Đen" }],
                reviewed: false
            }
        ]
    },
    {
        id: 10002,
        totalAmount: 1500000,
        shippingFee: 0,
        status: EOrderStatus.SHIPPING,
        paymentMethod: EPaymentMethod.VNPAY,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        address: {
            id: 2,
            fullName: "Trần Thị B",
            phone: "0987654321",
            province: { code: "79", name: "Hồ Chí Minh" },
            district: { code: "760", name: "Quận 1" },
            ward: { code: "26734", name: "Phường Bến Nghé" },
            street: "Số 2 Đường XYZ",
            fullAddress: "Số 2 Đường XYZ, Phường Bến Nghé, Quận 1, Hồ Chí Minh",
            isDefault: false
        },
        statusHistory: [
            {
                id: 2,
                orderId: 10002,
                fromStatus: null,
                toStatus: EOrderStatus.PENDING,
                note: null,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
                createdBy: "Trần Thị B"
            },
            {
                id: 3,
                orderId: 10002,
                fromStatus: EOrderStatus.PENDING,
                toStatus: EOrderStatus.PREPARING,
                note: null,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5).toISOString(),
                createdBy: "System"
            },
            {
                id: 4,
                orderId: 10002,
                fromStatus: EOrderStatus.PREPARING,
                toStatus: EOrderStatus.SHIPPING,
                note: null,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
                createdBy: "System"
            }
        ],
        items: [
            {
                id: 3,
                productId: 3,
                productName: "Bàn phím cơ Leopold FC900R PD",
                productImage: "https://placehold.co/150x150/e2e8f0/64748b?text=Leopold",
                quantity: 1,
                price: 1500000,
                attributes: [{ name: "Switch", value: "Brown" }],
                reviewed: true
            }
        ]
    }
];

export class OrderMockRepo implements OrderRepo {
    async getUserOrders(status?: EOrderStatus): Promise<ApiResponse<OrderModel[]>> {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let filtered = [...MOCK_ORDERS];
        if (status) {
            filtered = filtered.filter(o => o.status === status);
        } else {
            // default is active orders
            const activeStatuses: EOrderStatus[] = [EOrderStatus.PENDING, EOrderStatus.PREPARING, EOrderStatus.SHIPPING];
            filtered = filtered.filter(o => activeStatuses.includes(o.status));
        }

        return {
            success: true,
            message: "Success",
            data: filtered
        };
    }

    async getOrderDetail(orderId: number): Promise<ApiResponse<OrderModel>> {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const order = MOCK_ORDERS.find(o => o.id === orderId);
        if (!order) {
            return {
                success: false,
                message: "Không tìm thấy đơn hàng",
                data: null as any
            };
        }

        return {
            success: true,
            message: "Success",
            data: order
        };
    }

    async cancelOrder(orderId: number, reason: string): Promise<ApiResponse<null>> {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const order = MOCK_ORDERS.find(o => o.id === orderId);
        if (!order) {
            return {
                success: false,
                message: "Không tìm thấy đơn hàng",
                data: undefined
            };
        }

        if (order.status !== EOrderStatus.PENDING) {
            return {
                success: false,
                message: "Chỉ có thể hủy đơn hàng ở trạng thái Chờ xử lý",
                data: undefined
            };
        }

        order.status = EOrderStatus.CANCELLED;
        order.statusHistory.push({
            id: Date.now(),
            orderId,
            fromStatus: EOrderStatus.PENDING,
            toStatus: EOrderStatus.CANCELLED,
            note: reason,
            createdAt: new Date().toISOString(),
            createdBy: "User"
        });

        return {
            success: true,
            message: "Hủy đơn hàng thành công",
            data: undefined
        };
    }
}
