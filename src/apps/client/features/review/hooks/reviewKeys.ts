export const reviewKeys = {
    all: ['reviews'] as const,
    product: (productId: string) => [...reviewKeys.all, 'product', productId] as const,
};
