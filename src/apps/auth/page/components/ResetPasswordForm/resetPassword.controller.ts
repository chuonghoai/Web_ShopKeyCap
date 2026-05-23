// src/apps/auth/page/components/ResetPasswordForm/resetPassword.controller.ts
import { useState } from 'react';
import { useToast } from '../../../../../components/toast/toast';

export const useResetPasswordController = (email: string, onNavigate: (view: any) => void) => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp || !newPassword || !confirmPassword) {
            toast('Vui lòng điền đầy đủ các trường dữ liệu', 'warning');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast('Mật khẩu xác nhận không khớp nhau', 'error');
            return;
        }

        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast('Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.', 'success');
            onNavigate('login');
        } catch (error: any) {
            toast('Có lỗi xảy ra trong quá trình đặt lại mật khẩu', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        otp, setOtp,
        newPassword, setNewPassword,
        confirmPassword, setConfirmPassword,
        showPassword,
        togglePassword: () => setShowPassword(!showPassword),
        isLoading,
        handleSubmit
    };
};