import React from 'react';
import { X } from 'lucide-react';
import { StaffForm } from './StaffForm';
import type { StaffModel } from '../../../features/staff/models/staff.model';

import { useStaffModalController } from '../cpnControllers/StaffModal.controller';

interface StaffModalProps {
    isOpen: boolean;
    mode: 'create' | 'edit';
    initialData?: StaffModel;
    onClose: () => void;
    onSubmit: (data: any) => void;
    isSubmitting: boolean;
}

export const StaffModal: React.FC<StaffModalProps> = ({ isOpen, mode, initialData, onClose, onSubmit, isSubmitting }) => {
    useStaffModalController(isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center p-4 sm:p-6">
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={() => !isSubmitting && onClose()}
            ></div>
            
            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            {mode === 'create' ? 'Tạo nhân viên mới' : 'Cập nhật nhân viên'}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            {mode === 'create' ? 'Điền đầy đủ thông tin để thêm nhân viên vào hệ thống' : 'Chỉnh sửa thông tin nhân viên đang chọn'}
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <StaffForm 
                        mode={mode}
                        initialData={initialData}
                        onSubmit={onSubmit}
                        onCancel={onClose}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </div>
    );
};
