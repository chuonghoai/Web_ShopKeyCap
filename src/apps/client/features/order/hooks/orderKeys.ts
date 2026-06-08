import type { PrepareCheckoutRequest } from "../dto/prepareCheckout.request";

export const orderKeys = {
    all: ['orders'] as const,
    prepareCheckout: (requests: PrepareCheckoutRequest[], addressId?: string) => {
        const serializedItems = requests
            .map(item => `${item.variantId}:${item.quantity}`)
            .sort()
            .join('|');
        return [...orderKeys.all, 'prepare', { items: serializedItems, addressId }] as const;
    },
    results: () => [...orderKeys.all, 'results'] as const,
    result: (orderId: string) => [...orderKeys.results(), orderId] as const,
};
