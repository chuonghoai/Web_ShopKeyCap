import { useSearchParams } from 'react-router-dom';
import { useOrderResultQuery } from '../../features/order/hooks/queries/useOrderResult.query';
import { EPaymentMethod } from '../../features/order/enums/paymentMethod.enum';
import { EPaymentStatus } from '../../features/order/enums/paymentStatus.enum';
import { PaymentRedirectResolverRegistry } from '../../features/order/utils/paymentRedirect.util';

export const useOrderResultController = () => {
    const [searchParams] = useSearchParams();
    const orderId = PaymentRedirectResolverRegistry.resolveOrderId(searchParams);

    const {
        data: result,
        isLoading,
        error
    } = useOrderResultQuery(orderId || '');

    return {
        orderId,
        result,
        isLoading,
        error,
        isCodPending: result?.paymentMethod === EPaymentMethod.COD && result?.paymentStatus === EPaymentStatus.PENDING,
        isOnlinePaid: result?.paymentMethod !== EPaymentMethod.COD && result?.paymentStatus === EPaymentStatus.PAID,
    };
};
