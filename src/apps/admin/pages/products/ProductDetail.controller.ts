import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useProductDetailQuery } from "../../features/products/hooks/queries/productDetail.query";
import { useUpdateProductMutation } from "../../features/products/hooks/mutations/updateProduct.mutation";
import { useCreateProductMutation } from "../../features/products/hooks/mutations/createProduct.mutation";
import { useToastStore } from "../../../../core/store/useToastStore";
import { useDocumentTitle } from "../../../../core/hooks/useDocumentTitle";
import { generateSlug } from "../../../../utils/string.utils";
import type { ProductVariant } from "../../../client/features/products/model/variant.model";

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

    const nameValue = form.watch('name');
    useEffect(() => {
        if (isEditing && nameValue) {
            form.setValue('slug', generateSlug(nameValue), { shouldValidate: true });
        }
    }, [nameValue, isEditing, form]);

    const handleSave = form.handleSubmit((data) => {
        const excludedVariantKeys = (data as any).excludedVariantKeys || [];
        const variants: ProductVariant[] = data.variants || [];
        const activeVariants = variants.filter(v => {
            const key = v.sku || JSON.stringify(v.attributes);
            return !excludedVariantKeys.includes(key);
        });

        if (activeVariants.length === 0) {
            toast("Product phải có ít nhất một Variant đang hoạt động.", "error");
            return;
        }

        for (const variant of activeVariants) {
            if (Number(variant.price) <= 0 || Number(variant.stockQuantity) < 0) {
                toast(`Biến thể ${Object.values(variant.attributes || {}).join(' - ') || variant.sku} có giá hoặc tồn kho không hợp lệ.`, "error");
                return;
            }
        }

        const prices = activeVariants.map(v => Number(v.price) || 0);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const totalStockQuantity = activeVariants.reduce((sum, v) => sum + (Number(v.stockQuantity) || 0), 0);

        if (minPrice <= 0 || maxPrice < minPrice || totalStockQuantity < 0) {
            toast("Dữ liệu tổng hợp không hợp lệ.", "error");
            return;
        }

        const { price, originalPrice, percentDiscount, stockQuantity, excludedVariantKeys: _ex, ...restData } = data as any;
        const payload = {
            ...restData,
            minPrice,
            maxPrice,
            totalStockQuantity,
            variants: activeVariants
        };

        if (isNew) {
            createMutation.mutate(payload as any, {
                onSuccess: () => {
                    toast("Tạo sản phẩm thành công", "success");
                    navigate('/admin/products');
                },
                onError: () => {
                    toast("Lỗi khi tạo sản phẩm", "error");
                }
            });
        } else {
            updateMutation.mutate({ id: productId, ...payload } as any, {
                onSuccess: () => {
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
