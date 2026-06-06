import type { PrepareCheckoutRequest } from "../dto/prepareCheckout.request";

export const orderKeys = {
    all: ['orders'] as const,
    prepareCheckout: (requests: PrepareCheckoutRequest[]) => [...orderKeys.all, 'prepare', requests] as const,
    results: () => [...orderKeys.all, 'results'] as const,
    result: (orderId: string) => [...orderKeys.results(), orderId] as const,
};
