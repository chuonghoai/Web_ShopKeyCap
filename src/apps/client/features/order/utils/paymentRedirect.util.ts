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

    static parseOrderIdSafe(val: string | null): number | null {
        if (!val) return null;
        const num = Number(val);
        if (isNaN(num) || num <= 0 || !Number.isInteger(num)) return null;
        return num;
    }

    static resolveOrderId(searchParams: URLSearchParams): number | null {
        const globalOrderId = this.parseOrderIdSafe(searchParams.get('orderId'));
        if (globalOrderId !== null) {
            return globalOrderId;
        }

        for (const resolver of this.resolvers) {
            if (resolver.canResolve(searchParams)) {
                return resolver.resolveOrderId(searchParams);
            }
        }

        return null;
    }
}

PaymentRedirectResolverRegistry.register({
    providerName: EPaymentMethod.MOMO,
    canResolve: (params) => params.get('partnerCode') === EPaymentMethod.MOMO || params.has('requestId'),
    resolveOrderId: (params) => {
        const orderIdParam = params.get('orderId');
        if (!orderIdParam) return null;
        const parts = orderIdParam.split('_');
        return parts.length >= 2 ? PaymentRedirectResolverRegistry.parseOrderIdSafe(parts[1]) : null;
    }
});

PaymentRedirectResolverRegistry.register({
    providerName: EPaymentMethod.VNPAY,
    canResolve: (params) => params.has('vnp_TxnRef'),
    resolveOrderId: (params) => {
        const txnRef = params.get('vnp_TxnRef');
        if (!txnRef) return null;
        const parts = txnRef.split('_');
        return parts.length >= 2 ? PaymentRedirectResolverRegistry.parseOrderIdSafe(parts[1]) : null;
    }
});

PaymentRedirectResolverRegistry.register({
    providerName: EPaymentMethod.PAYPAL,
    canResolve: (params) => params.has('token') && params.has('PayerID'),
    resolveOrderId: () => null
});
