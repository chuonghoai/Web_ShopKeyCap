import { useAddressesQuery } from "../../../../features/address/hooks/queries/useAddresses.query";

export const useAddressListController = () => {
    const { data: addresses, isLoading, isError, error } = useAddressesQuery();

    return {
        addresses: addresses || [],
        isLoading,
        isError,
        error: error instanceof Error ? error.message : "Đã xảy ra lỗi khi tải danh sách địa chỉ"
    };
};
