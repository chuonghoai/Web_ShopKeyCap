import { useSearchParams } from "react-router-dom";
import { useProductsQuery } from "../../features/products/hooks/queries/products.query";
import { useDeleteProductMutation } from "../../features/products/hooks/mutations/deleteProduct.mutation";
import { useToastStore } from "../../../../core/store/useToastStore";

export const useProductListController = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const page = Number(searchParams.get('page')) || 1;
    const search = searchParams.get('search') || '';
    const limit = 12;

    const { data: productsData, isLoading, isError, error } = useProductsQuery(page, limit, search);
    const deleteMutation = useDeleteProductMutation();
    const toast = useToastStore(state => state.addToast);

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            deleteMutation.mutate(id, {
                onSuccess: () => {
                    toast("Xóa sản phẩm thành công", "success");
                },
                onError: () => {
                    toast("Lỗi khi xóa sản phẩm", "error");
                }
            });
        }
    };

    const handlePageChange = (newPage: number) => {
        searchParams.set('page', newPage.toString());
        setSearchParams(searchParams);
    };

    const handleSearch = (newSearch: string) => {
        if (newSearch) {
            searchParams.set('search', newSearch);
        } else {
            searchParams.delete('search');
        }
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    };

    return {
        products: productsData?.data || [],
        pagination: productsData?.pagination,
        isLoading,
        isError,
        error,
        page,
        search,
        handlePageChange,
        handleSearch,
        handleDelete,
        isDeleting: deleteMutation.isPending
    };
};
