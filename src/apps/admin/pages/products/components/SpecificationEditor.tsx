import React from 'react';
import { useFieldArray, type Control, type UseFormRegister } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
    control: Control<any>;
    register: UseFormRegister<any>;
    isEditing: boolean;
}

export const SpecificationEditor: React.FC<Props> = ({ control, register, isEditing }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'specifications'
    });

    return (
        <div className="w-full bg-white p-6 lg:p-8 rounded-xl border border-slate-200 shadow-sm h-full">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-5">
                <h2 className="text-[18px] font-bold text-slate-900">Thông số kỹ thuật</h2>
                {isEditing && (
                    <button 
                        type="button" 
                        onClick={() => append({ name: '', value: '' })}
                        className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-md transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Thêm
                    </button>
                )}
            </div>

            {fields.length === 0 ? (
                <div className="text-center text-slate-400 py-10 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
                    <p className="text-sm mb-2">Chưa có thông số</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-start gap-2 group">
                            <input
                                {...register(`specifications.${index}.name`)}
                                disabled={!isEditing}
                                placeholder="Tên (VD: Switch)"
                                className="w-[40%] px-3 py-2 text-sm rounded-md border border-slate-300 outline-none focus:border-blue-500 disabled:bg-slate-50 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-blue-500/20"
                            />
                            <input
                                {...register(`specifications.${index}.value`)}
                                disabled={!isEditing}
                                placeholder="Giá trị (VD: Cherry Red)"
                                className="flex-1 px-3 py-2 text-sm rounded-md border border-slate-300 outline-none focus:border-blue-500 disabled:bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20"
                            />
                            {isEditing && (
                                <button 
                                    type="button" 
                                    onClick={() => remove(index)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
