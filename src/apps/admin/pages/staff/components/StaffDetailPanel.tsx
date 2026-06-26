import React from 'react';
import type { StaffModel } from '../../../features/staff/models/staff.model';
import { X, MoreHorizontal, Edit, Trash2, Mail, Phone, Calendar, Briefcase, User, Wallet } from 'lucide-react';
import { useStaffDetailPanelController } from '../cpnControllers/StaffDetailPanel.controller';
import { ERole } from '../../../../../core/constants/role.constant';

interface StaffDetailPanelProps {
    staff: StaffModel;
    isLoading: boolean;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
}

export const StaffDetailPanel: React.FC<StaffDetailPanelProps> = ({ 
    staff, isLoading, onClose, onEdit, onDelete, isDeleting 
}) => {
    const { isMenuOpen, menuRef, toggleMenu, closeMenu } = useStaffDetailPanelController();

    if (isLoading) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!staff) return null;

    const roleName = staff.role === ERole.ADMIN ? "Quản trị viên" : "Nhân viên";

    return (
        <div className="flex flex-col h-full w-full bg-white overflow-y-auto relative">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Thông tin nhân viên</h2>
                
                <div className="flex items-center gap-2">
                    <div className="relative" ref={menuRef}>
                        <button 
                            onClick={toggleMenu}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                        
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20">
                                <button
                                    onClick={() => { closeMenu(); onEdit(); }}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() => { closeMenu(); onDelete(); }}
                                    disabled={isDeleting}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    {isDeleting ? 'Đang xóa...' : 'Xóa nhân viên'}
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <button 
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col p-6 space-y-8">
                {/* Profile Header */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 text-white text-2xl font-bold shadow-md">
                        {String(staff.name).charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{staff.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                            <Briefcase className="w-4 h-4" />
                            <span>{roleName}</span>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Liên hệ</h4>
                    <div className="bg-slate-50 rounded-xl p-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-slate-400" />
                            <div>
                                <p className="text-xs text-slate-500 mb-0.5">Email</p>
                                <p className="text-sm font-medium text-slate-900">{staff.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-slate-400" />
                            <div>
                                <p className="text-xs text-slate-500 mb-0.5">Số điện thoại</p>
                                <p className="text-sm font-medium text-slate-900">{staff.phonenumber}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Personal Section */}
                <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Cá nhân</h4>
                    <div className="bg-slate-50 rounded-xl p-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-slate-400" />
                            <div>
                                <p className="text-xs text-slate-500 mb-0.5">Giới tính</p>
                                <p className="text-sm font-medium text-slate-900">
                                    {staff.gender === 'MALE' ? 'Nam' : 'Nữ'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-slate-400" />
                            <div>
                                <p className="text-xs text-slate-500 mb-0.5">Ngày sinh</p>
                                <p className="text-sm font-medium text-slate-900">
                                    {new Date(staff.dob).toLocaleDateString('vi-VN')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Employment Section */}
                <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Công việc</h4>
                    <div className="bg-slate-50 rounded-xl p-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <Wallet className="w-5 h-5 text-slate-400" />
                            <div>
                                <p className="text-xs text-slate-500 mb-0.5">Lương cơ bản</p>
                                <p className="text-sm font-medium text-slate-900">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(staff.salary)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-slate-400" />
                            <div>
                                <p className="text-xs text-slate-500 mb-0.5">Ngày tham gia</p>
                                <p className="text-sm font-medium text-slate-900">
                                    {new Date(staff.createAt).toLocaleDateString('vi-VN')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
