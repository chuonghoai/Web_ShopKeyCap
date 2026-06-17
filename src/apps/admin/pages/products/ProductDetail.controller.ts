import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useProductDetailQuery } from "../../features/products/hooks/queries/productDetail.query";
import { useUpdateProductMutation } from "../../features/products/hooks/mutations/updateProduct.mutation";
import { useCreateProductMutation } from "../../features/products/hooks/mutations/createProduct.mutation";
import { useToastStore } from "../../../../core/store/useToastStore";
import { useDocumentTitle } from "../../../../core/hooks/useDocumentTitle";
import { generateSlug } from "../../../../utils/string.utils";

export const useProductDetailController = () => {
    const toast = useToastStore(state => state.addToast)
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';
    const productId = isNew ? 0 : Number(id);

    const { data: productDetailRes, isLoading, isError } = useProductDetailQuery(productId);
    const productDetail = productDetailRes?.data;
    const updateMutation = useUpdateProductMutation();
    const createMutation = useCreateProductMutation();

    const [isEditing, setIsEditing] = useState(isNew);
    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    useDocumentTitle(productDetail?.name || 'Cyber Key - Tạo sản phẩm mới')

    const form = useForm({
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            imageUrl: '',
            options: [],
            variants: [],
            price: 0,
            originalPrice: 0,
            percentDiscount: 0,
            stockQuantity: 0,
        }
    });

    useEffect(() => {
        if (productDetail && !isNew) {
            form.reset({
                ...productDetail,
                options: productDetail.options || [],
                variants: productDetail.variants || [],
            });
        }
    }, [productDetail, form, isNew]);

    // Slug Auto Generation
    const nameValue = form.watch('name');
    useEffect(() => {
        if (isEditing && nameValue) {
            form.setValue('slug', generateSlug(nameValue), { shouldValidate: true });
        }
    }, [nameValue, isEditing, form]);

    const handleSave = form.handleSubmit((data) => {
        if (isNew) {
            createMutation.mutate(data as any, {
                onSuccess: () => {
                    toast("Tạo sản phẩm thành công", "success");
                    navigate('/admin/products');
                    console.log("Tạo sản phẩm: ", data);
                },
                onError: () => {
                    toast("Lỗi khi tạo sản phẩm", "error");
                }
            });
        } else {
            updateMutation.mutate({ id: productId, ...data } as any, {
                onSuccess: () => {
                    console.log(data);
                    toast("Cập nhật thành công", "success");
                    setIsEditing(false);
                },
                onError: () => {
                    toast("Lỗi khi cập nhật sản phẩm", "error");
                }
            });
        }
    });

    const handleBack = () => {
        navigate('/admin/products');
    };

    return {
        form,
        isLoading,
        isError,
        isNew,
        productId,
        isEditing,
        handleToggleEdit,
        handleSave,
        handleBack
    };
};
