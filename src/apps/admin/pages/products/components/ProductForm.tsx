import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { useProductFormController } from "../cpnControllers/ProductForm.controller";
import { Plus, Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { RichTextEditor } from "../../../components/rich-text-editor/RichTextEditor";
import { ProductOptionEditor } from "./ProductOptionEditor";
import { SpecificationEditor } from "./SpecificationEditor";
import { VariantPricingTable } from "./VariantPricingTable";

interface Props {
    form: UseFormReturn<any>;
    isEditing: boolean;
}

export const ProductForm: React.FC<Props> = ({ form, isEditing }) => {
    const { register, watch, setValue } = form;
    const imageUrl = watch('imageUrl');
    const thumbnailUrl = watch('thumbnailUrl') || [];
    const formCtrl = useProductFormController();

    return (
        <div className="w-full flex flex-col gap-10">
            {/* Main Block: Media + General Info */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 bg-white p-6 lg:p-10 rounded-xl border border-slate-200 shadow-sm">
                
                {/* Left Column: Media */}
                <div className="w-full lg:w-[45%] shrink-0 flex flex-col gap-4">
                    <h2 className="text-[18px] font-bold text-slate-900 border-b border-slate-100 pb-3">Hình ảnh sản phẩm</h2>
                    
                    <div className="bg-slate-50 rounded-xl overflow-hidden aspect-square border-2 border-dashed border-slate-300 mb-4 flex items-center justify-center p-4 relative group">
                        {imageUrl ? (
                            <img src={imageUrl} alt="Preview" className="w-full h-full object-contain mix-blend-multiply" />
                        ) : (
                            <div className="text-center text-slate-400">
                                <span className="material-icons-outlined text-4xl mb-2">image</span>
                                <p className="text-sm">Chưa có ảnh chính</p>
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
                                    Thay đổi ảnh chính
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
                    <div className="grid grid-cols-4 gap-3 mt-2">
                        {thumbnailUrl.map((url: string, index: number) => (
                            <div key={index} className="aspect-square bg-slate-50 border border-slate-200 rounded-lg overflow-hidden relative group">
                                <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-contain mix-blend-multiply" />
                                {isEditing && (
                                    <button 
                                        type="button"
                                        onClick={() => formCtrl.handleRemoveGalleryImage(index, setValue, thumbnailUrl)}
                                        className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>
                        ))}
                        {isEditing && (
                            <label className="aspect-square bg-white border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors cursor-pointer group">
                                <Plus className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-bold uppercase tracking-wide">Thêm</span>
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

                {/* Right Column: Info & Variants */}
                <div className="w-full lg:w-[55%] flex flex-col gap-6">
                    <div>
                        <h2 className="text-[18px] font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5">Thông tin cơ bản</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">Tên sản phẩm *</label>
                                <input 
                                    {...register('name')}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-600 font-medium text-slate-900"
                                    placeholder="Ví dụ: Bàn phím cơ AKKO 3098..."
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">Đường dẫn (Slug)</label>
                                <input 
                                    {...register('slug')}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-slate-50 text-slate-500 text-sm font-mono"
                                    placeholder="tu-dong-tao-tu-ten-san-pham"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Price Block (Simulate Client UI) */}
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mt-2">
                        <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Cấu hình giá trị (Mặc định)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-slate-600">Giá bán (VNĐ)</label>
                                <Controller
                                    name="price"
                                    control={form.control}
                                    render={({ field }) => (
                                        <input 
                                            type="text"
                                            value={field.value ? Number(field.value).toLocaleString('vi-VN') : ''}
                                            onChange={(e) => {
                                                const rawValue = e.target.value.replace(/\./g, '').replace(/,/g, '');
                                                const num = Number(rawValue);
                                                if (!isNaN(num)) field.onChange(num);
                                                else if (rawValue === '') field.onChange(0);
                                            }}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 outline-none focus:border-blue-500 disabled:bg-transparent font-bold text-blue-600"
                                            placeholder="0"
                                        />
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-slate-600">Giá gốc (VNĐ)</label>
                                <Controller
                                    name="originalPrice"
                                    control={form.control}
                                    render={({ field }) => (
                                        <input 
                                            type="text"
                                            value={field.value ? Number(field.value).toLocaleString('vi-VN') : ''}
                                            onChange={(e) => {
                                                const rawValue = e.target.value.replace(/\./g, '').replace(/,/g, '');
                                                const num = Number(rawValue);
                                                if (!isNaN(num)) field.onChange(num);
                                                else if (rawValue === '') field.onChange(0);
                                            }}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 outline-none focus:border-blue-500 disabled:bg-transparent font-bold text-slate-600 line-through"
                                            placeholder="0"
                                        />
                                    )}
                                />
                            </div>
                            <div className="space-y-2 relative">
                                <label className="block text-xs font-bold text-slate-600">% Giảm giá</label>
                                <input 
                                    type="number"
                                    {...register('percentDiscount')}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 pr-6 text-sm rounded-md border border-slate-300 outline-none focus:border-blue-500 disabled:bg-transparent font-bold text-orange-600"
                                    placeholder="0"
                                />
                                <span className="absolute right-3 top-8 text-xs font-bold text-slate-400">%</span>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-slate-600">Tồn kho</label>
                                <input 
                                    type="number"
                                    {...register('stockQuantity')}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 outline-none focus:border-blue-500 disabled:bg-transparent font-medium text-slate-800"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Variants Editor */}
                    <ProductOptionEditor 
                        control={form.control}
                        register={register}
                        isEditing={isEditing}
                    />

                    {/* Variant Pricing Overrides */}
                    <VariantPricingTable 
                        control={form.control}
                        register={register}
                        setValue={setValue}
                        isEditing={isEditing}
                    />
                </div>
            </div>

            {/* Bottom Block: Specs & Description */}
            <div className="flex flex-col lg:flex-row gap-10 w-full mb-16">
                {/* Description */}
                <div className="w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-xl border border-slate-200 shadow-sm h-full">
                    <h2 className="text-[18px] font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5">Đặc điểm nổi bật (Description)</h2>
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <RichTextEditor 
                                value={field.value || ''} 
                                onChange={field.onChange} 
                                disabled={!isEditing}
                            />
                        )}
                    />
                </div>

                {/* Specs */}
                <div className="w-full lg:w-1/3">
                    <SpecificationEditor 
                        control={form.control}
                        register={register}
                        isEditing={isEditing}
                    />
                </div>
            </div>
        </div>
    );
};
