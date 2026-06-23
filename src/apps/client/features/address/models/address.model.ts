export interface Address {
    id: number;

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

export interface CreateAddressRequestModel {
    recipientName: string;
    phone: string;
    provinceCode: string;
    provinceName: string;
    districtCode: string;
    districtName: string;
    wardCode: string;
    wardName: string;
    street?: string;
    fullAddress?: string;
    latitude?: number;
    longitude?: number;
    isDefault?: boolean;
}

export type UpdateAddressRequestModel = CreateAddressRequestModel;

export interface ProvinceModel {
    id: number;
    name: string;
}

export interface DistrictModel {
    id: number;
    name: string;
}

export interface WardModel {
    id: string;
    name: string;
}
