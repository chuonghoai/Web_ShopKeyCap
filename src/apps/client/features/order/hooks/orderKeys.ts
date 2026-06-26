import type { PrepareCheckoutRequest } from "../dto/prepareCheckout.request";

export const orderKeys = {
    all: ['orders'] as const,
    prepareCheckout: (requests: PrepareCheckoutRequest[], addressId?: number) => {
        const serializedItems = requests
            .map(item => `${item.variantId}:${item.quantity}`)
            .sort()
            .join('|');
        return [...orderKeys.all, 'prepare', { items: serializedItems, addressId }] as const;
    },
    results: () => [...orderKeys.all, 'results'] as const,
    result: (orderId: number) => [...orderKeys.results(), orderId] as const,
    lists: () => [...orderKeys.all, 'lists'] as const,
    list: (status?: string) => [...orderKeys.lists(), status ?? 'ALL'] as const,
    details: () => [...orderKeys.all, 'details'] as const,
    detail: (orderId: number) => [...orderKeys.details(), orderId] as const,
};
