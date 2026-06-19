import React from 'react';
import type { StaffModel } from '../../../features/staff/models/staff.model';

import { useStaffFormController } from '../cpnControllers/StaffForm.controller';

interface StaffFormProps {
    mode: 'create' | 'edit';
    initialData?: StaffModel;
    onSubmit: (data: any) => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

export const StaffForm: React.FC<StaffFormProps> = ({ mode, initialData, onSubmit, onCancel, isSubmitting }) => {
    const { register, errors, handleFormSubmit } = useStaffFormController({ mode, initialData, onSubmit });

    return (
        <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Tên nhân viên</label>
                    <input
                        type="text"
                        {...register("name", { required: "Tên không được để trống" })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tên"
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message as string}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email không được để trống",
                            pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" }
                        })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="example@email.com"
                    />
                    {errors.email && <span className="text-xs text-red-500">{errors.email.message as string}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Số điện thoại</label>
                    <input
                        type="text"
                        {...register("phonenumber", { required: "Số điện thoại không được để trống" })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0123456789"
                    />
                    {errors.phonenumber && <span className="text-xs text-red-500">{errors.phonenumber.message as string}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Ngày sinh</label>
                    <input
                        type="date"
                        {...register("dob", { required: "Ngày sinh không được để trống" })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.dob && <span className="text-xs text-red-500">{errors.dob.message as string}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Giới tính</label>
                    <select
                        {...register("gender")}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="MALE">Nam</option>
                        <option value="FEMALE">Nữ</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Mức lương (VNĐ)</label>
                    <input
                        type="number"
                        {...register("salary", { required: "Mức lương không được để trống", min: { value: 0, message: "Mức lương không hợp lệ" } })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="10000000"
                    />
                    {errors.salary && <span className="text-xs text-red-500">{errors.salary.message as string}</span>}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                    Hủy bỏ
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center min-w-30"
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        mode === 'create' ? 'Tạo nhân viên' : 'Lưu thay đổi'
                    )}
                </button>
            </div>
        </form>
    );
};
