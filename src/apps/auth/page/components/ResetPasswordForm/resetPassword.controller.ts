import { useState } from 'react';
import { useToastStore } from '../../../../../core/store/useToastStore';
import { authService } from '../../../features/services/auth.service';
import { OtpPurpose } from '../../../features/dto/otp.dto';
import { useDocumentTitle } from '../../../../../core/hooks/useDocumentTitle';

export const useResetPasswordController = (email: string, onNavigate: (view: any) => void) => {
    useDocumentTitle("Đặt lại mật khẩu");
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToastStore(state => state.addToast);

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
            const result = await authService.resetPassword({
                email,
                otp,
                otpPurpose: OtpPurpose.FORGOT_PASSWORD,
                newPassword,
                confirmPassword
            });
            if (result.success) {
                toast(result.message || "Đặt lại mật khẩu thành công", "success");
                onNavigate('login');
            } else {
                toast(result.message || "Đặt lại mật khẩu thất bại", "error");
            }
        } catch (error: any) {
            const apiErrMsg = error.response?.data?.message
                || error.response?.data?.message
                || error.message
                || "Yêu cầu thất bại";
            toast(apiErrMsg, "error");
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