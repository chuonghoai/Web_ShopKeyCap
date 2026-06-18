import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { OrderAdminModel } from "../models/order.model";
import type { UpdateOrderStatusRequest } from "../models/update-order-status.request";
import type { CancelOrderRequest } from "../models/cancel-order.request";
import type { OrderRepo } from "./order.repo";
import { EOrderStatus } from "../../../../client/features/order/enums/orderStatus.enum";
import { EPaymentMethod } from "../../../../client/features/order/enums/paymentMethod.enum";

export class OrderMockRepo implements OrderRepo {
  async getOrders(page: number, limit: number = 20, _keyword?: string, status?: EOrderStatus): Promise<ApiResponse<OrderAdminModel[]>> {
    let filteredOrders = [...mockOrdersAdmin];

    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === status);
    } else {
      filteredOrders = filteredOrders.filter(o =>
        o.status === EOrderStatus.PENDING ||
        o.status === EOrderStatus.PREPARING ||
        o.status === EOrderStatus.SHIPPING
      );

      const statusWeight: Record<string, number> = {
        [EOrderStatus.PENDING]: 1,
        [EOrderStatus.PREPARING]: 2,
        [EOrderStatus.SHIPPING]: 3
      };

      filteredOrders.sort((a, b) => {
        const weightA = statusWeight[a.status as string] || 99;
        const weightB = statusWeight[b.status as string] || 99;
        return weightA - weightB;
      });
    }

    return Promise.resolve({
      success: true,
      message: "Success",
      data: filteredOrders,
      pagination: {
        page,
        pageSize: limit,
        totalItems: filteredOrders.length,
        totalPages: Math.ceil(filteredOrders.length / limit) || 1,
      }
    });
  }

  async getOrderDetail(id: number): Promise<ApiResponse<OrderAdminModel>> {
    return Promise.resolve({
      success: true,
      message: "Success",
      data: mockOrdersAdmin.find(order => order.id === id),
    });
  }

  async updateOrderStatus(request: UpdateOrderStatusRequest): Promise<ApiResponse<OrderAdminModel>> {
    const order = mockOrdersAdmin.find(order => order.id === request.id);
    if (order) {
      order.status = request.status;

      order.statusHistory.push({
        id: 999,
        orderId: request.id,
        fromStatus: order.status,
        toStatus: request.status,
        note: "cập nhật something",
        createdAt: new Date().toISOString(),
        createdBy: "Admin",
      })
    }
    return Promise.resolve({
      success: true,
      message: "Success",
      data: order,
    });
  }

  async cancelOrder(request: CancelOrderRequest): Promise<ApiResponse<OrderAdminModel>> {
    const order = mockOrdersAdmin.find(order => order.id === request.id);
    if (order) {
      order.statusHistory.push({
        id: 999,
        orderId: request.id,
        fromStatus: order.status,
        toStatus: EOrderStatus.CANCELLED,
        note: request.reason,
        createdAt: new Date().toISOString(),
        createdBy: "Admin",
      })
      order.status = EOrderStatus.CANCELLED;
    }
    return Promise.resolve({
      success: true,
      message: "Success",
      data: order,
    });
  }
}

export const mockOrdersAdmin: OrderAdminModel[] = [
  {
    id: 1,
    totalAmount: 65000,
    shippingFee: 0,
    status: EOrderStatus.SUCCESS,
    paymentMethod: EPaymentMethod.MOMO,
    createdAt: '2026-06-18T08:30:00Z',
    address: 'Trường Đại học Sư phạm Kỹ thuật TP.HCM',
    statusHistory: [
      {
        id: 101,
        orderId: 1,
        fromStatus: null,
        toStatus: EOrderStatus.PENDING,
        note: 'Hệ thống ghi nhận đơn hàng',
        createdAt: '2026-06-18T08:00:00Z',
        createdBy: null,
      },
      {
        id: 102,
        orderId: 1,
        fromStatus: EOrderStatus.PENDING,
        toStatus: EOrderStatus.PREPARING,
        note: 'Hệ thống ghi nhận đơn hàng',
        createdAt: '2026-06-18T08:00:00Z',
        createdBy: null,
      },
      {
        id: 103,
        orderId: 1,
        fromStatus: EOrderStatus.PREPARING,
        toStatus: EOrderStatus.SHIPPING,
        note: 'Hệ thống ghi nhận đơn hàng',
        createdAt: '2026-06-18T08:00:00Z',
        createdBy: null,
      },
      {
        id: 104,
        orderId: 1,
        fromStatus: EOrderStatus.SHIPPING,
        toStatus: EOrderStatus.SUCCESS,
        note: 'Giao dịch thành công',
        createdAt: '2026-06-18T08:30:00Z',
        createdBy: 'System',
      },
    ],
    items: [
      {
        id: 1001,
        productId: 201,
        productName: "Thẻ Zing",
        productImage: 'https://example.com/zing-card.jpg',
        quantity: 1,
        price: 65000,
        attributes: [
          {
            name: 'Mệnh giá',
            value: '65,000 VND',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    totalAmount: 125000,
    shippingFee: 15000,
    status: EOrderStatus.PREPARING,
    paymentMethod: EPaymentMethod.MOMO,
    createdAt: '2026-06-17T18:45:00Z',
    address: '123 Đường Võ Văn Ngân, Thủ Đức, TP.HCM',
    statusHistory: [
      {
        id: 103,
        orderId: 2,
        fromStatus: null,
        toStatus: EOrderStatus.PREPARING,
        note: 'Đã xác nhận thanh toán qua ví',
        createdAt: '2026-06-17T18:45:00Z',
        createdBy: 'hong hac',
      },
    ],
    items: [
      {
        id: 1002,
        productId: 202,
        productName: 'Mì Cay Nam Hàn - Xuyên Á',
        productImage: 'https://example.com/mi-cay.jpg',
        quantity: 1,
        price: 75000,
        attributes: [
          {
            name: 'Cấp độ',
            value: 'Cấp 2',
          },
          {
            name: 'Topping',
            value: 'Thêm xúc xích',
          },
        ],
      },
      {
        id: 1003,
        productId: 203,
        productName: 'Nước tăng lực Rockstar',
        productImage: 'https://example.com/rockstar.jpg',
        quantity: 2,
        price: 25000,
        attributes: [],
      },
    ],
  },
  {
    id: 3,
    totalAmount: 250000,
    shippingFee: 20000,
    status: EOrderStatus.SHIPPING,
    paymentMethod: EPaymentMethod.COD,
    createdAt: '2026-06-16T12:15:00Z',
    address: 'Ký túc xá ĐH Sư phạm Kỹ thuật',
    statusHistory: [
      {
        id: 104,
        orderId: 3,
        fromStatus: EOrderStatus.PREPARING,
        toStatus: EOrderStatus.SHIPPING,
        note: 'Bàn giao cho đơn vị vận chuyển Grab',
        createdAt: '2026-06-16T14:00:00Z',
        createdBy: 'Admin_01',
      },
    ],
    items: [
      {
        id: 1004,
        productId: 204,
        productName: 'Bật lửa điện hình rồng',
        productImage: 'https://example.com/lighter.jpg',
        quantity: 1,
        price: 250000,
        attributes: [
          {
            name: 'Màu sắc',
            value: 'Vàng đồng',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    totalAmount: 110000,
    shippingFee: 15000,
    status: EOrderStatus.CANCELLED,
    paymentMethod: EPaymentMethod.PAYPAL,
    createdAt: '2026-06-18T20:10:00Z',
    address: 'Quận 9, TP.HCM',
    statusHistory: [
      {
        id: 105,
        orderId: 4,
        fromStatus: null,
        toStatus: EOrderStatus.PENDING,
        note: 'Chờ nhà hàng xác nhận',
        createdAt: '2026-06-18T20:10:00Z',
        createdBy: null,
      },
      {
        id: 106,
        orderId: 4,
        fromStatus: EOrderStatus.PENDING,
        toStatus: EOrderStatus.CANCELLED,
        note: 'Hủy đơn hàng',
        createdAt: '2026-06-18T20:10:00Z',
        createdBy: null,
      },
    ],
    items: [
      {
        id: 1005,
        productId: 205,
        productName: 'Cơm chiên xá xíu kiểu Hồng Kông',
        productImage: 'https://example.com/com-chien.jpg',
        quantity: 1,
        price: 70000,
        attributes: [
          {
            name: 'Ghi chú',
            value: 'Nhiều tương ớt',
          },
        ],
      },
      {
        id: 1006,
        productId: 206,
        productName: 'Snack FamilyMart',
        productImage: 'https://example.com/snack.jpg',
        quantity: 2,
        price: 20000,
        attributes: [],
      },
    ],
  },
  {
    id: 5,
    totalAmount: 110000,
    shippingFee: 15000,
    status: EOrderStatus.PENDING,
    paymentMethod: EPaymentMethod.PAYPAL,
    createdAt: '2026-06-18T20:10:00Z',
    address: 'Quận 9, TP.HCM',
    statusHistory: [
      {
        id: 105,
        orderId: 4,
        fromStatus: null,
        toStatus: EOrderStatus.PENDING,
        note: 'Chờ nhà hàng xác nhận',
        createdAt: '2026-06-18T20:10:00Z',
        createdBy: null,
      }
    ],
    items: [
      {
        id: 1005,
        productId: 205,
        productName: 'Cơm chiên xá xíu kiểu Hồng Kông',
        productImage: 'https://example.com/com-chien.jpg',
        quantity: 1,
        price: 70000,
        attributes: [
          {
            name: 'Ghi chú',
            value: 'Nhiều tương ớt',
          },
        ],
      },
      {
        id: 1006,
        productId: 206,
        productName: 'Snack FamilyMart',
        productImage: 'https://example.com/snack.jpg',
        quantity: 2,
        price: 20000,
        attributes: [],
      },
    ],
  },
];