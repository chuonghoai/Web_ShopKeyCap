import React from 'react';
import { useProfileController } from './useProfile.controller';
import { ProfileSkeleton } from './components/ProfileSkeleton';
import { AlertCircle, UserCircle2, Edit2, Package, CheckCircle2, Heart, Camera, Loader2, Save } from 'lucide-react';

const ProfilePage: React.FC = () => {
    const { 
        profile, isLoading, error, 
        isEditing, isSaving, formData, actions 
    } = useProfileController();

    if (isLoading && !profile) {
        return <ProfileSkeleton />;
    }

    if (error || !profile) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8 flex flex-col items-center justify-center min-h-75">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-xl font-semibold text-slate-800">Không thể tải thông tin cá nhân</h2>
                <p className="text-slate-500 mt-2">Vui lòng tải lại trang hoặc thử lại sau.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* 1. Hero / Header Section */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative">
                <div className="shrink-0 relative group">
                    {formData.avatarPreview ? (
                        <img
                            src={formData.avatarPreview}
                            alt={formData.fullName || profile.fullName}
                            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border border-slate-100"
                        />
                    ) : (
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-300">
                            <UserCircle2 className="w-12 h-12 md:w-16 md:h-16" />
                        </div>
                    )}
                    
                    {isEditing && (
                        <label className="absolute inset-0 flex items-center justify-center bg-slate-900/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                            <Camera className="w-8 h-8" />
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                disabled={isSaving}
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        actions.handleAvatarChange(e.target.files[0]);
                                    }
                                }}
                            />
                        </label>
                    )}
                </div>
                <div className="flex-1 text-center md:text-left flex flex-col md:justify-center h-full pt-1">
                    <h1 className="text-2xl md:text-3xl mb-0 font-bold text-slate-900">{isEditing ? formData.fullName : profile.fullName}</h1>
                    <p className="text-slate-500 mt-1 md:mt-2">{profile.email}</p>
                    <p className="text-slate-500 mt-1 md:mt-2">Thành viên từ: {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('vi-VN') : '...'}</p>
                </div>
                <div className="absolute top-6 right-6 md:static md:mt-1">
                    {!isEditing && (
                        <button 
                            onClick={actions.handleEditClick}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                            <span className="hidden md:inline">Chỉnh sửa</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 2. Card Thông tin tài khoản */}
                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-slate-900">Thông tin tài khoản</h2>
                    </div>
                    
                    <div className="space-y-5 flex-1">
                        <div>
                            <label className="block text-sm text-slate-500 mb-1.5">Họ và tên</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => actions.setFullName(e.target.value)}
                                    disabled={isSaving}
                                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-50 disabled:text-slate-500 text-slate-900"
                                />
                            ) : (
                                <span className="block text-base font-medium text-slate-900">{profile.fullName}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm text-slate-500 mb-1.5">Email</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed select-none"
                                />
                            ) : (
                                <span className="block text-base font-medium text-slate-900">{profile.email}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm text-slate-500 mb-1.5">Số điện thoại</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => actions.setPhone(e.target.value)}
                                    disabled={isSaving}
                                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-50 disabled:text-slate-500 text-slate-900"
                                />
                            ) : (
                                <span className={`block text-base ${profile.phoneNumber ? 'text-slate-900 font-medium' : 'text-slate-400 italic'}`}>
                                    {profile.phoneNumber || 'Chưa cập nhật'}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Action buttons when editing */}
                    {isEditing && (
                        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
                            <button
                                onClick={actions.handleCancelClick}
                                disabled={isSaving}
                                className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-50"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={actions.handleSave}
                                disabled={isSaving || !formData.fullName}
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Đang lưu...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        <span>Lưu thay đổi</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* 3. Card Hoạt động mua sắm (Placeholder) */}
                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8">
                    <h2 className="text-lg font-semibold text-slate-900 mb-6">Hoạt động mua sắm</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                                <Package className="w-4 h-4" />
                            </div>
                            <span className="text-2xl font-bold text-slate-900 mb-1">{profile.stats?.totalOrders ?? '--'}</span>
                            <span className="text-sm text-slate-500">Tổng đơn hàng</span>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-center">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span className="text-2xl font-bold text-slate-900 mb-1">{profile.stats?.completedOrders ?? '--'}</span>
                            <span className="text-sm text-slate-500">Đơn hoàn thành</span>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-center col-span-2 sm:col-span-1">
                            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-3">
                                <Heart className="w-4 h-4" />
                            </div>
                            <span className="text-2xl font-bold text-slate-900 mb-1">{profile.stats?.wishlistItems ?? '--'}</span>
                            <span className="text-sm text-slate-500">Sản phẩm yêu thích</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
