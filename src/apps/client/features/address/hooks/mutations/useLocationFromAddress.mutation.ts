import { useMutation } from '@tanstack/react-query';
import { addressService } from '../../services/address.service';

export const useLocationFromAddressMutation = () => {
    return useMutation({
        mutationFn: async (address: string) => {
            return await addressService.getLocationFromAddress(address);
        },
    });
};
