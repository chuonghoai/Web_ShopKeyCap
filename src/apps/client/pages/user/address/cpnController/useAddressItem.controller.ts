import type { Address } from "../../../../features/address";
import { useDeleteAddressMutation } from "../../../../features/address/hooks/mutations/useDeleteAddress.mutation";
import { useSetDefaultAddressMutation } from "../../../../features/address/hooks/mutations/useSetDefaultAddress.mutation";

export const useAddressItemController = (address: Address) => {
    const deleteMutation = useDeleteAddressMutation();
    const setDefaultMutation = useSetDefaultAddressMutation();

    const handleDelete = () => {
        if (address.isDefault) {
            return;
        }
        
        if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
            deleteMutation.mutate(address.id);
        }
    };

    const handleSetDefault = () => {
        if (!address.isDefault) {
            setDefaultMutation.mutate(address.id);
        }
    };

    return {
        isDeleting: deleteMutation.isPending,
        isSettingDefault: setDefaultMutation.isPending,
        handleDelete,
        handleSetDefault
    };
};
