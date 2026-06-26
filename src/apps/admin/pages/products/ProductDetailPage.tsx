import React from "react";
import { useProductDetailController } from "./ProductDetail.controller";
import { ProductForm } from "./components/ProductForm";
import { ProductFloatingActions } from "../../components/floating-action/ProductFloatingActions";
import { ArrowLeft } from "lucide-react";

export const ProductDetailPage: React.FC = () => {
    const { form, isLoading, isError, isNew, productId, isEditing, handleToggleEdit, handleSave, handleBack } = useProductDetailController();

    if (isLoading && !isNew) return <div className="p-8 text-center text-slate-500">Đang tải dữ liệu sản phẩm...</div>;
    if (isError) return <div className="p-8 text-center text-red-500">Đã xảy ra lỗi tải chi tiết!</div>;

    return (
        <div className="w-full">
            {/* Header Area */}
            <div className="mb-8 flex items-center space-x-4">
                <button 
                    onClick={handleBack}
                    className="p-2.5 rounded-full hover:bg-slate-200 transition-colors text-slate-500"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {isNew ? 'Thêm Sản Phẩm Mới' : form.watch('name')}
                    </h1>
                    <p className="text-slate-500 mt-1 text-sm">
                        {isNew ? 'Điền thông tin cơ bản để tạo mới' : `ID Sản phẩm: #${productId}`}
                    </p>
                </div>
            </div>

            {/* Form Area */}
            <ProductForm form={form} isEditing={isEditing} />

            {/* Bubble Action */}
            <ProductFloatingActions 
                mode="detail" 
                productId={productId} 
                isEditing={isEditing}
                onToggleEdit={handleToggleEdit}
                onSave={handleSave} 
            />
        </div>
    );
};
