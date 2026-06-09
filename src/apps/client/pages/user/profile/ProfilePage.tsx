import React from 'react';
import { useProfileController } from './useProfile.controller';
import { ProfileSkeleton } from './components/ProfileSkeleton';
import { AlertCircle, UserCircle2, Edit2, Package, CheckCircle2, Heart } from 'lucide-react';

const ProfilePage: React.FC = () => {
    const { profile, isLoading, error } = useProfileController();

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
                <div className="shrink-0">
                    {profile.avatar ? (
                        <img
                            src={profile.avatar}
                            alt={profile.fullName}
                            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border border-slate-100"
                        />
                    ) : (
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-300">
                            <UserCircle2 className="w-12 h-12 md:w-16 md:h-16" />
                        </div>
                    )}
                </div>
                <div className="flex-1 text-center md:text-left flex flex-col md:justify-center h-full pt-1">
                    <h1 className="text-2xl md:text-3xl mb-0 font-bold text-slate-900">{profile.fullName}</h1>
                    <p className="text-slate-500 mt-1 md:mt-2">{profile.email}</p>
                    <p className="text-slate-500 mt-1 md:mt-2">Thành viên từ: {profile.createdAt?.toLocaleDateString('vi-VN') ?? '...'}</p>
                </div>
                <div className="absolute top-6 right-6 md:static md:mt-1">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors">
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden md:inline">Chỉnh sửa</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 2. Card Thông tin tài khoản */}
                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8">
                    <h2 className="text-lg font-semibold text-slate-900 mb-6">Thông tin tài khoản</h2>
                    <div className="space-y-5">
                        <div>
                            <span className="block text-sm text-slate-500 mb-1">Họ và tên</span>
                            <span className="block text-base font-medium text-slate-900">{profile.fullName}</span>
                        </div>
                        <div>
                            <span className="block text-sm text-slate-500 mb-1">Email</span>
                            <span className="block text-base font-medium text-slate-900">{profile.email}</span>
                        </div>
                        <div>
                            <span className="block text-sm text-slate-500 mb-1">Số điện thoại</span>
                            <span className="block text-base text-slate-400 italic">{profile.phoneNumber ?? 'Chưa cập nhật'}</span>
                        </div>
                    </div>
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
