import React, { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useProductFormController } from "../cpnControllers/ProductForm.controller";
import { Plus, Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { RichTextEditor } from "../../../components/rich-text-editor/RichTextEditor";
import { ProductOptionEditor } from "./ProductOptionEditor";
import { SpecificationEditor } from "./SpecificationEditor";
import { VariantPricingTable } from "./VariantPricingTable";
import { ProductClassificationSection } from "./ProductClassificationSection";
import type { ProductVariant } from "../../../../client/features/products/model/variant.model";

interface Props {
    form: UseFormReturn<any>;
    isEditing: boolean;
}

export const ProductForm: React.FC<Props> = ({ form, isEditing }) => {
    const { register, watch, setValue, control } = form;
    const imageUrl = watch('imageUrl');
    const thumbnailUrl = watch('thumbnailUrl') || [];
    const name = watch('name') || '';
    const variants: ProductVariant[] = watch('variants') || [];
    const formCtrl = useProductFormController();

    const totalStock = useMemo(() => variants.reduce((sum, v) => sum + (Number(v.stockQuantity) || 0), 0), [variants]);
    const prices = useMemo(() => variants.map(v => Number(v.price) || 0), [variants]);
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;
    const priceRangeStr = minPrice === maxPrice
        ? minPrice.toLocaleString('vi-VN') + ' đ'
        : `${minPrice.toLocaleString('vi-VN')} đ - ${maxPrice.toLocaleString('vi-VN')} đ`;

    return (
        <div className="w-full flex flex-col lg:flex-row gap-8 items-start relative">
            {/* Left Column: Main Content (70%) */}
            <div className="w-full lg:w-[70%] flex flex-col gap-8">

                {/* 1. General Info & Media */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8">
                    {/* Media */}
                    <div className="w-full md:w-[45%] shrink-0 flex flex-col gap-4">
                        <h2 className="text-[16px] font-bold text-slate-900 border-b border-slate-100 pb-3">Hình ảnh</h2>

                        <div className="bg-slate-50 rounded-xl overflow-hidden aspect-square border-2 border-dashed border-slate-300 mb-2 flex items-center justify-center p-4 relative group">
                            {imageUrl ? (
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-contain mix-blend-multiply" />
                            ) : (
                                <div className="text-center text-slate-400">
                                    <span className="material-icons-outlined text-4xl mb-2">image</span>
                                    <p className="text-sm">Chưa có ảnh</p>
                                </div>
                            )}
                            {formCtrl.isUploading && (
                                <div className="absolute inset-0 bg-white/70 flex items-center justify-center backdrop-blur-sm z-10">
                                    <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
                                </div>
                            )}
                            {isEditing && (
                                <div className="absolute inset-0 bg-slate-900/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <label className="cursor-pointer bg-white text-slate-800 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors shadow-lg">
                                        Thay đổi ảnh
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                formCtrl.handleUploadImage(e.target.files, setValue);
                                                e.target.value = '';
                                            }}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 gap-2">
                            {thumbnailUrl.map((url: string, index: number) => (
                                <div key={index} className="aspect-square bg-slate-50 border border-slate-200 rounded-lg overflow-hidden relative group">
                                    <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-contain mix-blend-multiply" />
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => formCtrl.handleRemoveGalleryImage(index, setValue, thumbnailUrl)}
                                            className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <label className="aspect-square bg-white border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors cursor-pointer group">
                                    <Plus className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
                                    <span className="text-[9px] font-bold uppercase tracking-wide">Thêm</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => {
                                            formCtrl.handleUploadGallery(e.target.files, setValue, thumbnailUrl);
                                            e.target.value = '';
                                        }}
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="w-full md:w-[55%] flex flex-col gap-6">
                        <h2 className="text-[16px] font-bold text-slate-900 border-b border-slate-100 pb-3">Thông tin cơ bản</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">Tên sản phẩm *</label>
                                <input
                                    {...register('name')}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-600 font-medium text-slate-900"
                                    placeholder="Ví dụ: Bàn phím cơ AKKO 3098..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">Đường dẫn (Slug)</label>
                                <input
                                    {...register('slug')}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-slate-50 text-slate-500 text-sm font-mono"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <ProductClassificationSection control={control} isEditing={isEditing} />

                {/* 2. Options & Variants */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
                    <ProductOptionEditor
                        control={control}
                        register={register}
                        isEditing={isEditing}
                    />

                    {isEditing && (
                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mt-2">
                            <h3 className="text-sm font-bold text-slate-700 mb-3">Cấu hình giá trị (Mặc định cho biến thể mới)</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-slate-600">Giá bán (VNĐ)</label>
                                    <Controller
                                        name="price"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="text"
                                                value={field.value ? Number(field.value).toLocaleString('vi-VN') : ''}
                                                onChange={(e) => {
                                                    const rawValue = e.target.value.replace(/\./g, '').replace(/,/g, '');
                                                    const num = Number(rawValue) || 0;
                                                    field.onChange(num);

                                                    const orig = watch('originalPrice') || 0;
                                                    if (orig > 0 && num <= orig) {
                                                        const p = Math.round(((orig - num) / orig) * 100);
                                                        setValue('percentDiscount', p, { shouldDirty: true });
                                                    }
                                                }}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 outline-none focus:border-blue-500 disabled:bg-slate-50 font-bold text-blue-600"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-slate-600">Giá gốc (VNĐ)</label>
                                    <Controller
                                        name="originalPrice"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="text"
                                                value={field.value ? Number(field.value).toLocaleString('vi-VN') : ''}
                                                onChange={(e) => {
                                                    const rawValue = e.target.value.replace(/\./g, '').replace(/,/g, '');
                                                    const num = Number(rawValue) || 0;
                                                    field.onChange(num);

                                                    const currentPrice = watch('price') || 0;
                                                    if (num > 0 && currentPrice <= num) {
                                                        const p = Math.round(((num - currentPrice) / num) * 100);
                                                        setValue('percentDiscount', p, { shouldDirty: true });
                                                    }
                                                }}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 outline-none focus:border-blue-500 disabled:bg-slate-50 font-bold text-slate-600 line-through"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="space-y-1.5 relative">
                                    <label className="block text-xs font-bold text-slate-600">% Giảm giá</label>
                                    <input
                                        type="number"
                                        value={watch('percentDiscount') || 0}
                                        onChange={(e) => {
                                            const val = Number(e.target.value) || 0;
                                            setValue('percentDiscount', val, { shouldDirty: true });

                                            const orig = watch('originalPrice') || 0;
                                            if (orig > 0) {
                                                const newPrice = Math.round(orig * (1 - val / 100));
                                                setValue('price', newPrice, { shouldDirty: true });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 pr-6 text-sm rounded-md border border-slate-300 outline-none focus:border-blue-500 disabled:bg-slate-50 font-bold text-orange-600"
                                    />
                                    <span className="absolute right-3 top-6.5 text-xs font-bold text-slate-400">%</span>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-slate-600">Tồn kho</label>
                                    <input
                                        type="number"
                                        {...register('stockQuantity')}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 outline-none focus:border-blue-500 disabled:bg-slate-50 font-medium text-slate-800"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <VariantPricingTable
                        control={control}
                        register={register}
                        setValue={setValue}
                        isEditing={isEditing}
                    />
                </div>

                {/* 3. Specs */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
                    <SpecificationEditor
                        control={control}
                        register={register}
                        isEditing={isEditing}
                    />
                </div>

                {/* 4. Description */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
                    <h2 className="text-[16px] font-bold text-slate-900 border-b border-slate-100 pb-3">Đặc điểm nổi bật (Chi tiết)</h2>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <RichTextEditor
                                value={field.value || ''}
                                onChange={field.onChange}
                                disabled={!isEditing}
                            />
                        )}
                    />
                </div>

                <div className="h-10"></div>
            </div>

            {/* Right Column: Sticky Summary Panel (30%) */}
            <div className="w-full lg:w-[30%] lg:sticky lg:top-24 flex flex-col gap-4">
                <div className="bg-slate-900 rounded-xl p-5 shadow-lg text-white">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Tóm tắt sản phẩm</h3>

                    <div className="space-y-4">
                        <div>
                            <span className="block text-xs text-slate-400 mb-1">Tên sản phẩm</span>
                            <p className="text-base font-bold text-white line-clamp-2">{name || 'Chưa có tên'}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-800 rounded-lg p-3">
                                <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">Phân loại</span>
                                <p className="text-xl font-bold text-blue-400">{variants.length}</p>
                            </div>
                            <div className="bg-slate-800 rounded-lg p-3">
                                <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">Tổng tồn kho</span>
                                <p className="text-xl font-bold text-emerald-400">{totalStock.toLocaleString('vi-VN')}</p>
                            </div>
                        </div>

                        <div>
                            <span className="block text-xs text-slate-400 mb-1">Khoảng giá bán</span>
                            <p className="text-lg font-bold text-white bg-slate-800 p-3 rounded-lg border border-slate-700">
                                {variants.length > 0 ? priceRangeStr : 'Đang cập nhật...'}
                            </p>
                        </div>

                        {variants.length > 0 && !isEditing && (
                            <div className="mt-4 pt-4 border-t border-slate-700">
                                <span className="block text-xs text-slate-400 mb-2">Danh sách biến thể:</span>
                                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                    {variants.map((v, i) => (
                                        <div key={i} className="bg-slate-800 p-2.5 rounded-lg flex justify-between items-center text-sm border border-slate-700/50">
                                            <span className="font-medium text-slate-200 line-clamp-1 w-[60%]">
                                                {Object.values(v.attributes || {}).join(' - ')}
                                            </span>
                                            <div className="flex flex-col items-end w-[40%]">
                                                <span className="font-bold text-blue-300">{Number(v.price || 0).toLocaleString('vi-VN')}đ</span>
                                                <span className="text-[10px] text-slate-400">Kho: {v.stockQuantity}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
