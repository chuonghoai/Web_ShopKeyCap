export const reviewKeys = {
    all: ['reviews'] as const,
    product: (productId: number) => [...reviewKeys.all, 'product', productId] as const,
    available: (orderId: number) => [...reviewKeys.all, 'available', orderId] as const,
};
