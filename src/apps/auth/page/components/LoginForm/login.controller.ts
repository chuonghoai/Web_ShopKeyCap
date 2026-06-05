import { useState } from 'react';
import { useDocumentTitle } from '../../../../../core/hooks/useDocumentTitle';
import { useToastStore } from '../../../../../core/store/useToastStore';
import { useNavigate } from 'react-router-dom';
import { type CredentialResponse } from '@react-oauth/google';
import { getAdminRoute } from '../../../../../utils/getAdminRoute';
import { useLoginMutation, useLoginGoogleMutation } from '../../../features/hooks/mutations/useLogin.mutation';

export const useLoginController = () => {
    useDocumentTitle('Đăng nhập - Cyber Key');

    const toast = useToastStore(state => state.addToast);
    const loginMutation = useLoginMutation();
    const loginGoogleMutation = useLoginGoogleMutation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
            const data = await loginMutation.mutateAsync({ email, password });
            toast("Đăng nhập thành công", 'success');
            navigate(getAdminRoute(data.user.role));
        } catch (error: any) {
            const apiErrMsg = error.response?.data?.message
                || error.response?.data?.message
                || error.message
                || "Đăng nhập thất bại";
            toast(apiErrMsg, 'error');
        }
    };

    /**
     * Submit login with google request
     */
    const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            try {
                const data = await loginGoogleMutation.mutateAsync(credentialResponse.credential);
                toast("Đăng nhập thành công!", 'success');
                navigate(getAdminRoute(data.user.role));
            } catch (error: any) {
                const apiErrMsg = error.response?.data?.message
                    || error.response?.data?.message
                    || error.message
                    || "Đăng nhập google thất bại";
                toast(apiErrMsg, 'error');
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return {
        isLoading: loginMutation.isPending || loginGoogleMutation.isPending,

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
