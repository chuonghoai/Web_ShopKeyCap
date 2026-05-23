import { useState } from 'react';
import { useDocumentTitle } from '../../../../../core/hooks/useDocumentTitle';

export const useLoginController = () => {
    useDocumentTitle('Đăng nhập - Cyber Key');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        alert('Login attempt');

        setIsLoading(false);
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
    };
};
