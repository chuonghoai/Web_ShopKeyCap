import { useState, useEffect } from 'react';
import { useToastStore } from '../../../../../core/store/useToastStore';
import { authService } from '../../../features/services/auth.service';
import { OtpPurpose } from '../../../features/dto/otp.dto';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../../../../core/hooks/useDocumentTitle';
import { getAdminRoute } from '../../../../../utils/getAdminRoute';
import { useRegisterMutation } from '../../../features/hooks/mutations/useRegister.mutation';

export const useRegisterController = () => {
    useDocumentTitle("Đăng ký - Cyber Key");

    const toast = useToastStore(state => state.addToast);
    const registerMutation = useRegisterMutation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [timer, setTimer] = useState(0);

    /**
     * Set timer after sending OTP
     */
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    /**
     * Submit request send OTP
     */
    const handleSendOtp = async () => {
        if (!email) { toast("Vui lòng nhập email", "warning"); return; }
        setIsSendingOtp(true);
        try {
            const response = await authService.sendOtp(email, OtpPurpose.REGISTER);
            if (response.success) {
                toast(response.message || "OTP đã được gửi", "success");
                setTimer(30);
            } else {
                toast(response.message || "Gửi OTP thất bại", "error");
            }
        } catch (error: any) {
            const apiErrMsg = error.response?.data?.message
                || error.response?.data?.message
                || error.message
                || "Gửi OTP thất bại";
            toast(apiErrMsg, "error");
        } finally {
            setIsSendingOtp(false);
        }
    };

    /**
     * Submit register account request
     */
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast("Mật khẩu không khớp", "error");
            return;
        }

        try {
            const data = await registerMutation.mutateAsync({
                email,
                otp,
                otpPurpose: OtpPurpose.REGISTER,
                password,
                confirmPassword
            });

            toast("Đăng ký thành công!", "success");
            navigate(getAdminRoute(data.user.role));
        } catch (error: any) {
            const apiErrMsg = error.response?.data?.message
                || error.response?.data?.message
                || error.message
                || "Đăng ký thất bại";
            toast(apiErrMsg, "error");
        }
    };

    return {
        email, setEmail,

        otp, setOtp,
        password, setPassword, confirmPassword, setConfirmPassword,
        showPassword,
        togglePassword: () => setShowPassword(!showPassword),

        timer,
        isSendingOtp,
        isLoading: registerMutation.isPending,

        handleSendOtp, handleRegister,
    };
};