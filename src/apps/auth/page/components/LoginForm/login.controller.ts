import { useState } from 'react';
import { useDocumentTitle } from '../../../../../core/hooks/useDocumentTitle';
import { authService } from '../../../features/services/auth.service';
import { useToast } from '../../../../../components/toast/toast';
import { useNavigate } from 'react-router-dom';
import { type CredentialResponse } from '@react-oauth/google';

export const useLoginController = () => {
    useDocumentTitle('Đăng nhập - Cyber Key');

    const { toast } = useToast();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Submit login request
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast("Vui lòng điền đầy đủ thông tin", "warning");
            return;
        }

        try {
            setIsLoading(true);
            const result = await authService.login(email, password);

            if (result.success) {
                toast("Đăng nhập thành công", 'success');
                navigate("/");
            }
        } catch (error: any) {
            const apiErrMsg = error.response?.data?.message
                || error.response?.data?.message
                || error.message
                || "Đăng nhập thất bại";
            toast(apiErrMsg, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Submit login with google request
     */
    const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            try {
                setIsLoading(true);
                const result = await authService.loginByGoogle(credentialResponse.credential);

                if (result.success) {
                    toast("Đăng nhập thành công!", 'success');
                    navigate("/");
                }
            } catch (error: any) {
                const apiErrMsg = error.response?.data?.message
                    || error.response?.data?.message
                    || error.message
                    || "Đăng nhập google thất bại";
                toast(apiErrMsg, 'error');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return {
        isLoading,

        email,
        setEmail,

        password,
        setPassword,
        showPassword,
        toggleShowPassword,

        handleSubmit,
        handleGoogleLoginSuccess,
    };
};
