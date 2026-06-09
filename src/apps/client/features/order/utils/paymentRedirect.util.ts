export interface PaymentProviderResolver {
    providerName: string;
    canResolve(searchParams: URLSearchParams): boolean;
    resolveOrderId(searchParams: URLSearchParams): string | null;
}

export class PaymentRedirectResolverRegistry {
    private static resolvers: PaymentProviderResolver[] = [];

    static register(resolver: PaymentProviderResolver) {
        this.resolvers.push(resolver);
    }

    static resolveOrderId(searchParams: URLSearchParams): string | null {
        for (const resolver of this.resolvers) {
            if (resolver.canResolve(searchParams)) {
                return resolver.resolveOrderId(searchParams);
            }
        }

        return searchParams.get('orderId');
    }
}

PaymentRedirectResolverRegistry.register({
    providerName: 'MOMO',
    canResolve: (params) => params.get('partnerCode') === 'MOMO' || params.has('requestId'),
    resolveOrderId: (params) => params.get('orderId')
});

PaymentRedirectResolverRegistry.register({
    providerName: 'VNPAY',
    canResolve: (params) => params.has('vnp_TxnRef'),
    resolveOrderId: (params) => params.get('vnp_TxnRef')
});
