import { useState } from 'react';

export const useLoginController = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Login attempt');
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit
    };
};
