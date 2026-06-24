import { useMutation } from '@tanstack/react-query';
import { orderCheckoutService } from '../../services/order-checkout.service';

export const useCapturePayPalMutation = () => {
    return useMutation({
        mutationFn: async (token: string) => {
            const res = await orderCheckoutService.capturePayPalPayment(token);
            if (res.status === 'error') throw new Error(res.message);
            return res;
        },
    });
};
