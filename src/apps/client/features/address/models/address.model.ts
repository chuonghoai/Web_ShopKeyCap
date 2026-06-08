export interface Address {
    id: string;

    fullName: string;
    phone: string;

    province: {
        code: string;
        name: string;
    };

    district: {
        code: string;
        name: string;
    };

    ward: {
        code: string;
        name: string;
    };

    street: string;
    fullAddress: string;

    latitude?: number;
    longitude?: number;

    isDefault: boolean;
}

interface ShippingTime {
    earliestDay: string;
    latestDay: string;
}

/**
 * Địa chỉ giao hàng và thời gian dự kiến giao đến nơi
 */
export interface DeliveryInfoModel {
    address: Address | null;
    shippingTime: ShippingTime | null;
}
