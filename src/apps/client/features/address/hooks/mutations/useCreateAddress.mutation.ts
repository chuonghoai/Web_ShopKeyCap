import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addressService } from '../../services/address.service';
import { addressKeys } from '../addressKeys';
import type { CreateAddressRequestModel } from '../../models/address.model';

export const useCreateAddressMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (request: CreateAddressRequestModel) => {
            const res = await addressService.createAddress(request);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: addressKeys.all });
        },
    });
};
