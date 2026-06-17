import { describe, it, expect } from 'vitest';
import { PaymentRedirectResolverRegistry } from './paymentRedirect.util';

describe('PaymentRedirectResolverRegistry', () => {
    describe('parseOrderIdSafe', () => {
        it('should parse valid order IDs', () => {
            expect(PaymentRedirectResolverRegistry.parseOrderIdSafe('11')).toBe(11);
            expect(PaymentRedirectResolverRegistry.parseOrderIdSafe('12345')).toBe(12345);
        });

        it('should return null for invalid, negative, zero, or NaN values', () => {
            expect(PaymentRedirectResolverRegistry.parseOrderIdSafe('')).toBe(null);
            expect(PaymentRedirectResolverRegistry.parseOrderIdSafe('0')).toBe(null);
            expect(PaymentRedirectResolverRegistry.parseOrderIdSafe('-5')).toBe(null);
            expect(PaymentRedirectResolverRegistry.parseOrderIdSafe('abc')).toBe(null);
            expect(PaymentRedirectResolverRegistry.parseOrderIdSafe('12.5')).toBe(null);
            expect(PaymentRedirectResolverRegistry.parseOrderIdSafe(null)).toBe(null);
        });
    });

    describe('resolveOrderId', () => {
        it('Priority 1: should resolve from explicit orderId even if other params exist (e.g. VNPay)', () => {
            const params = new URLSearchParams('orderId=11&vnp_Amount=111490000&vnp_TxnRef=KEYCAP_11_1781707825167');
            const result = PaymentRedirectResolverRegistry.resolveOrderId(params);
            expect(result).toBe(11);
        });

        it('Priority 2 (VNPay): should resolve from vnp_TxnRef if orderId is missing', () => {
            const params = new URLSearchParams('vnp_Amount=111490000&vnp_TxnRef=KEYCAP_11_1781707825167');
            const result = PaymentRedirectResolverRegistry.resolveOrderId(params);
            expect(result).toBe(11);
        });

        it('Priority 2 (MoMo): should resolve from orderId if MoMo sends it as KEYCAP_{id}_{time}', () => {
            const params = new URLSearchParams('partnerCode=MOMO&orderId=KEYCAP_11_1781707825167');
            const result = PaymentRedirectResolverRegistry.resolveOrderId(params);
            expect(result).toBe(11);
        });

        it('Priority 1 (PayPal): should resolve from pure orderId', () => {
            const params = new URLSearchParams('token=EC-8P035764P0899450V&PayerID=X7WKY9R&orderId=11');
            const result = PaymentRedirectResolverRegistry.resolveOrderId(params);
            expect(result).toBe(11);
        });

        it('should handle completely missing orderId gracefully', () => {
            const params = new URLSearchParams('someOtherParam=123');
            const result = PaymentRedirectResolverRegistry.resolveOrderId(params);
            expect(result).toBe(null);
        });

        it('should handle reordered parameters gracefully', () => {
            const params = new URLSearchParams('vnp_TxnRef=KEYCAP_11_1781707825167&orderId=22');
            const result = PaymentRedirectResolverRegistry.resolveOrderId(params);
            expect(result).toBe(22);
        });

        it('should gracefully return null for badly formatted gateway data', () => {
            const params = new URLSearchParams('vnp_TxnRef=INVALIDDATA');
            const result = PaymentRedirectResolverRegistry.resolveOrderId(params);
            expect(result).toBe(null);
        });
    });
});
