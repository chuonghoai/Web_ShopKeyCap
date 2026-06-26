import { useState } from "react"
import { useDocumentTitle } from "../../../../../core/hooks/useDocumentTitle";
import { useToastStore } from "../../../../../core/store/useToastStore";
import { authService } from "../../../features/services/auth.service";
import { OtpPurpose } from "../../../features/dto/otp.dto";

export const useForgotPasswordController = (onNavigate: (view: any, email?: string) => void) => {
    useDocumentTitle('Quên mật khẩu - Cyber Key');

    const toast = useToastStore(state => state.addToast);

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast('Vui lòng nhập địa chỉ email', 'warning');
            return;
        }

        try {
            setIsLoading(true);
            const response = await authService.sendOtp(email, OtpPurpose.FORGOT_PASSWORD);
            if (response.success) {
                toast(response.message || "OTP đã được gửi", "success");
                onNavigate('reset-password', email);
            } else {
                toast(response.message || "Yêu cầu thất bại", "error");
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
        setIsLoading(false);
    };

    return {
        email,
        setEmail,
        handleSendOtp,
        isLoading,
    }

}