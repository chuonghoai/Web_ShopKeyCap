import React from "react";
import { Controller, type Control } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useBrandsQuery } from "../../../features/brands/hooks/queries/brands.query";
import { useCategoriesQuery } from "../../../features/categories/hooks/queries/categories.query";
import { useTypesQuery } from "../../../features/types/hooks/queries/types.query";

interface Props {
    control: Control<any>;
    isEditing: boolean;
}

export const ProductClassificationSection: React.FC<Props> = ({ control, isEditing }) => {
    const { data: brandsRes, isLoading: isBrandsLoading, isError: isBrandsError } = useBrandsQuery();
    const { data: categoriesRes, isLoading: isCategoriesLoading, isError: isCategoriesError } = useCategoriesQuery();
    const { data: typesRes, isLoading: isTypesLoading, isError: isTypesError } = useTypesQuery();

    const brands = brandsRes?.data || [];
    const categories = categoriesRes?.data || [];
    const types = typesRes?.data || [];

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
            <h2 className="text-[16px] font-bold text-slate-900 border-b border-slate-100 pb-3">Phân loại sản phẩm</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Brand */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700">Thương hiệu *</label>
                    <Controller
                        name="brandId"
                        control={control}
                        rules={{ required: "Vui lòng chọn thương hiệu" }}
                        render={({ field, fieldState: { error } }) => (
                            <div className="relative">
                                <select
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    disabled={!isEditing || isBrandsLoading}
                                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-600 font-medium text-slate-900 appearance-none ${
                                        error ? "border-red-500" : "border-slate-300"
                                    }`}
                                >
                                    <option value="" disabled>-- Chọn thương hiệu --</option>
                                    {brands.map(b => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    {isBrandsLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                                    ) : (
                                        <span className="material-icons-outlined text-slate-400 text-sm">expand_more</span>
                                    )}
                                </div>
                                {isBrandsError && <span className="text-xs text-red-500 mt-1 block">Lỗi tải danh sách</span>}
                                {error && <span className="text-xs text-red-500 mt-1 block">{error.message}</span>}
                            </div>
                        )}
                    />
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700">Danh mục *</label>
                    <Controller
                        name="categoryId"
                        control={control}
                        rules={{ required: "Vui lòng chọn danh mục" }}
                        render={({ field, fieldState: { error } }) => (
                            <div className="relative">
                                <select
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    disabled={!isEditing || isCategoriesLoading}
                                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-600 font-medium text-slate-900 appearance-none ${
                                        error ? "border-red-500" : "border-slate-300"
                                    }`}
                                >
                                    <option value="" disabled>-- Chọn danh mục --</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    {isCategoriesLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                                    ) : (
                                        <span className="material-icons-outlined text-slate-400 text-sm">expand_more</span>
                                    )}
                                </div>
                                {isCategoriesError && <span className="text-xs text-red-500 mt-1 block">Lỗi tải danh sách</span>}
                                {error && <span className="text-xs text-red-500 mt-1 block">{error.message}</span>}
                            </div>
                        )}
                    />
                </div>

                {/* Type */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700">Loại sản phẩm *</label>
                    <Controller
                        name="typeId"
                        control={control}
                        rules={{ required: "Vui lòng chọn loại sản phẩm" }}
                        render={({ field, fieldState: { error } }) => (
                            <div className="relative">
                                <select
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    disabled={!isEditing || isTypesLoading}
                                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-600 font-medium text-slate-900 appearance-none ${
                                        error ? "border-red-500" : "border-slate-300"
                                    }`}
                                >
                                    <option value="" disabled>-- Chọn loại sản phẩm --</option>
                                    {types.map(t => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    {isTypesLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                                    ) : (
                                        <span className="material-icons-outlined text-slate-400 text-sm">expand_more</span>
                                    )}
                                </div>
                                {isTypesError && <span className="text-xs text-red-500 mt-1 block">Lỗi tải danh sách</span>}
                                {error && <span className="text-xs text-red-500 mt-1 block">{error.message}</span>}
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};
