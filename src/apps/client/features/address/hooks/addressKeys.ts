export const addressKeys = {
    all: ['address'] as const,
    lists: () => [...addressKeys.all, 'list'] as const,
    shipping: (addressId?: number) => [...addressKeys.all, 'shipping', { addressId }] as const,
    provinces: () => [...addressKeys.all, 'provinces'] as const,
    districts: (provinceId: number) => [...addressKeys.all, 'districts', { provinceId }] as const,
    wards: (districtId: number) => [...addressKeys.all, 'wards', { districtId }] as const,
};
