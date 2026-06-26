import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addressService } from '../../services/address.service';
import { addressKeys } from '../addressKeys';

export const useSetDefaultAddressMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const res = await addressService.setDefaultAddress(id);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: addressKeys.all });
        },
    });
};
