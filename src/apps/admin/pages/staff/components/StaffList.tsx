import React from 'react';
import type { StaffModel } from '../../../features/staff/models/staff.model';
import { User, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface StaffListProps {
    staffs: StaffModel[];
    isLoading: boolean;
    isError: boolean;
    selectedStaffId: number | null;
    onSelect: (id: number) => void;
}

export const StaffList: React.FC<StaffListProps> = ({ staffs, isLoading, isError, selectedStaffId, onSelect }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col gap-3 py-4">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-20 w-full animate-pulse bg-slate-200 rounded-xl" />
                ))}
            </div>
        );
    }

    if (isError) {
        return <div className="p-8 text-center text-red-500">Đã xảy ra lỗi khi tải danh sách nhân viên.</div>;
    }

    if (staffs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <User className="w-12 h-12 mb-4 text-slate-300" />
                <p>Không có nhân viên nào.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 pb-8">
            {staffs.map(staff => {
                const isSelected = selectedStaffId === staff.id;
                
                return (
                    <div
                        key={staff.id}
                        onClick={() => onSelect(staff.id)}
                        className={clsx(
                            "group flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 border",
                            isSelected 
                                ? "bg-blue-50 border-blue-200 shadow-sm" 
                                : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={clsx(
                                "flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold shadow-sm shrink-0",
                                isSelected ? "bg-blue-500" : "bg-slate-800 group-hover:bg-slate-700"
                            )}>
                                {String(staff.name).charAt(0).toUpperCase()}
                            </div>
                            
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-slate-900 text-[15px] truncate">
                                    {staff.name}
                                </span>
                                <span className="text-sm text-slate-500 truncate">
                                    {staff.email}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 shrink-0">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-[13px] text-slate-400 uppercase tracking-wider font-medium">Lương</span>
                                <span className="text-[14px] font-medium text-slate-700">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(staff.salary)}
                                </span>
                            </div>
                            
                            <div className="hidden lg:flex flex-col items-end">
                                <span className="text-[13px] text-slate-400 uppercase tracking-wider font-medium">Ngày tham gia</span>
                                <span className="text-[14px] text-slate-600">
                                    {new Date(staff.createAt).toLocaleDateString('vi-VN')}
                                </span>
                            </div>

                            <ChevronRight className={clsx(
                                "w-5 h-5 transition-colors",
                                isSelected ? "text-blue-500" : "text-slate-300 group-hover:text-slate-400"
                            )} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
