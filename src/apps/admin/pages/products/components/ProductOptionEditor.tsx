import React from 'react';
import { useFieldArray, type Control, type UseFormRegister, useWatch } from 'react-hook-form';
import { Plus, Trash2, X } from 'lucide-react';

interface Props {
    control: Control<any>;
    register: UseFormRegister<any>;
    isEditing: boolean;
}

export const ProductOptionEditor: React.FC<Props> = ({ control, register, isEditing }) => {
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'options'
    });

    const optionsData = useWatch({ control, name: 'options' }) || [];

    const handleAddValue = (optionIndex: number, value: string) => {
        if (!value.trim()) return;
        const currentValues = optionsData[optionIndex]?.values || [];
        if (!currentValues.includes(value.trim())) {
            update(optionIndex, {
                ...optionsData[optionIndex],
                values: [...currentValues, value.trim()]
            });
        }
    };

    const handleRemoveValue = (optionIndex: number, valueIndex: number) => {
        const currentValues = [...(optionsData[optionIndex]?.values || [])];
        currentValues.splice(valueIndex, 1);
        update(optionIndex, {
            ...optionsData[optionIndex],
            values: currentValues
        });
    };

    return (
        <div className="flex flex-col gap-4 mt-2">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Tùy chọn sản phẩm (Options)</h3>
                {isEditing && (
                    <button 
                        type="button" 
                        onClick={() => append({ name: '', values: [] })}
                        className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-md transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Thêm Option
                    </button>
                )}
            </div>

            {fields.length === 0 ? (
                <div className="border border-dashed border-slate-300 rounded-xl p-6 bg-slate-50/50 flex flex-col items-center justify-center text-slate-500">
                    <p className="text-sm font-medium">Sản phẩm này không có biến thể</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {fields.map((field, index) => {
                        const values = optionsData[index]?.values || [];
                        return (
                            <div key={field.id} className="border border-slate-200 rounded-xl p-5 bg-white relative group shadow-sm hover:border-slate-300 transition-colors">
                                {isEditing && (
                                    <button 
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                                
                                <div className="mb-4 w-3/4">
                                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Tên Option</label>
                                    <input 
                                        {...register(`options.${index}.name`)}
                                        disabled={!isEditing}
                                        placeholder="VD: Kích thước, Màu sắc..."
                                        className="w-full px-3 py-2.5 text-sm rounded-md border border-slate-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 font-bold text-slate-900 transition-all"
                                    />
                                </div>

                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                    <label className="block text-xs font-bold text-slate-600 mb-2">Các giá trị (Values)</label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {values.length === 0 && !isEditing && (
                                            <span className="text-sm text-slate-400 italic">Chưa có giá trị</span>
                                        )}
                                        {values.map((v: string, vIndex: number) => (
                                            <span key={vIndex} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 flex items-center gap-1.5 shadow-sm">
                                                {v}
                                                {isEditing && (
                                                    <X 
                                                        className="w-3.5 h-3.5 text-slate-400 hover:text-red-500 cursor-pointer hover:bg-red-50 rounded-full transition-colors" 
                                                        onClick={() => handleRemoveValue(index, vIndex)}
                                                    />
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    {isEditing && (
                                        <input 
                                            type="text"
                                            placeholder="Nhập giá trị và nhấn Enter (hoặc Tab)..."
                                            className="w-full px-3 py-2.5 text-sm rounded-md border border-dashed border-slate-300 outline-none focus:border-blue-500 focus:border-solid bg-white transition-all focus:ring-2 focus:ring-blue-500/20"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === 'Tab') {
                                                    e.preventDefault();
                                                    handleAddValue(index, e.currentTarget.value);
                                                    e.currentTarget.value = '';
                                                }
                                            }}
                                            onBlur={(e) => {
                                                if (e.target.value) {
                                                    handleAddValue(index, e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
