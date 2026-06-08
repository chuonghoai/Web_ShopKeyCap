export const addressKeys = {
    all: ['address'] as const,
    lists: () => [...addressKeys.all, 'list'] as const,
    shipping: (addressId?: string) => [...addressKeys.all, 'shipping', { addressId }] as const,
};
