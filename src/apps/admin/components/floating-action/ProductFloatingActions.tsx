import React from "react";
import { useProductFloatingActionsController } from "./ProductFloatingActions.controller";
import { Save, Plus, Edit2 } from "lucide-react";

interface Props {
    mode: 'list' | 'detail';
    productId?: number;
    isEditing?: boolean;
    onToggleEdit?: () => void;
    onSave?: () => void;
}

export const ProductFloatingActions: React.FC<Props> = ({ mode, productId, isEditing, onToggleEdit, onSave }) => {
    const { handleCreateNew, handleSave } = useProductFloatingActionsController(mode, productId, onSave);

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
            {mode === 'detail' && isEditing && (
                <button 
                    onClick={handleSave}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 py-3 shadow-lg shadow-emerald-600/30 font-semibold tracking-wide flex items-center justify-center transition-transform hover:-translate-y-1"
                >
                    <Save className="mr-2 w-5 h-5" /> Lưu thay đổi
                </button>
            )}

            {mode === 'detail' && !isEditing && (
                <button 
                    onClick={onToggleEdit}
                    className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 py-3 shadow-lg shadow-blue-600/30 font-semibold tracking-wide flex items-center justify-center transition-transform hover:-translate-y-1"
                >
                    <Edit2 className="mr-2 w-5 h-5" /> Chỉnh sửa
                </button>
            )}

            <button 
                onClick={handleCreateNew}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 py-3 shadow-lg shadow-blue-600/30 font-semibold tracking-wide flex items-center justify-center transition-transform hover:-translate-y-1"
            >
                <Plus className="mr-2 w-5 h-5" /> Tạo sản phẩm mới
            </button>
        </div>
    );
};
