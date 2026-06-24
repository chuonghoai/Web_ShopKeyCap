import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useOrderResultQuery } from '../../features/order/hooks/queries/useOrderResult.query';
import { useCapturePayPalMutation } from '../../features/order/hooks/mutations/useCapturePayPal.mutation';
import { EPaymentMethod } from '../../features/order/enums/paymentMethod.enum';
import { EPaymentStatus } from '../../features/order/enums/paymentStatus.enum';
import { PaymentRedirectResolverRegistry } from '../../features/order/utils/paymentRedirect.util';

export const useOrderResultController = () => {
    const [searchParams] = useSearchParams();
    const orderId = PaymentRedirectResolverRegistry.resolveOrderId(searchParams);

    const token = searchParams.get('token');
    const payerId = searchParams.get('PayerID');

    const [hasCaptured, setHasCaptured] = useState(false);
    const isCapturingRef = useRef(false);

    const { mutateAsync: capturePayPal } = useCapturePayPalMutation();

    useEffect(() => {
        if (token && payerId && !hasCaptured && !isCapturingRef.current) {
            isCapturingRef.current = true;
            capturePayPal(token)
                .finally(() => {
                    setHasCaptured(true);
                });
        }
    }, [token, payerId, hasCaptured, capturePayPal]);

    const isCaptureNeeded = !!(token && payerId && !hasCaptured);

    const {
        data: result,
        isLoading,
        error
    } = useOrderResultQuery(orderId || 0, {
        enabled: !!orderId && !isCaptureNeeded
    });

    return {
        orderId,
        result,
        isLoading,
        error,
        isCapturing: isCaptureNeeded,
        isCodPending: result?.paymentMethod === EPaymentMethod.COD && result?.paymentStatus === EPaymentStatus.PENDING,
        isOnlinePaid: result?.paymentMethod !== EPaymentMethod.COD && result?.paymentStatus === EPaymentStatus.PAID,
    };
};
