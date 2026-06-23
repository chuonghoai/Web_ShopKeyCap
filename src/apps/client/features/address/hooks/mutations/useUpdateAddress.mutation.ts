import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addressService } from '../../services/address.service';
import { addressKeys } from '../addressKeys';
import type { UpdateAddressRequestModel } from '../../models/address.model';

export const useUpdateAddressMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, request }: { id: number; request: UpdateAddressRequestModel }) => {
            const res = await addressService.updateAddress(id, request);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: addressKeys.all });
        },
    });
};
