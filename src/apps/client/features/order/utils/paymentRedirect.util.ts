import { EPaymentMethod } from '../enums/paymentMethod.enum';

export interface PaymentProviderResolver {
    providerName: string;
    canResolve(searchParams: URLSearchParams): boolean;
    resolveOrderId(searchParams: URLSearchParams): number | null;
}

export class PaymentRedirectResolverRegistry {
    private static resolvers: PaymentProviderResolver[] = [];

    static register(resolver: PaymentProviderResolver) {
        this.resolvers.push(resolver);
    }

    static resolveOrderId(searchParams: URLSearchParams): number | null {
        for (const resolver of this.resolvers) {
            if (resolver.canResolve(searchParams)) {
                return resolver.resolveOrderId(searchParams);
            }
        }

        const val = searchParams.get('orderId');
        return val && !isNaN(Number(val)) ? Number(val) : null;
    }
}

PaymentRedirectResolverRegistry.register({
    providerName: EPaymentMethod.MOMO,
    canResolve: (params) => params.get('partnerCode') === EPaymentMethod.MOMO || params.has('requestId'),
    resolveOrderId: (params) => params.get('orderId') ? Number(params.get('orderId')) : null
});

PaymentRedirectResolverRegistry.register({
    providerName: EPaymentMethod.VNPAY,
    canResolve: (params) => params.has('vnp_TxnRef'),
    resolveOrderId: (params) => params.get('vnp_TxnRef') ? Number(params.get('vnp_TxnRef')) : null
});
