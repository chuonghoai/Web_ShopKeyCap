export const addressKeys = {
    all: ['address'] as const,
    lists: () => [...addressKeys.all, 'list'] as const,
    shipping: (addressId?: number) => [...addressKeys.all, 'shipping', { addressId }] as const,
};
