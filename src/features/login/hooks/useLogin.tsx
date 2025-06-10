import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { LoginError, LoginSuccess, LoginUser } from '../types/loginType';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../hooks/ApiClient';

export default function useLogin() {
    const [userFormData, setUserFormData] = useState<LoginUser>({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['loginUser'],
        mutationFn: (user: LoginUser): Promise<LoginSuccess> => {
            return apiClient.login<LoginSuccess>(user);
        },
        onError: (error: LoginError) => {
            console.error('Login failed:', error);
        },
        onSuccess: (data: LoginSuccess) => {
            if (data && data.data && data.data['accessToken']) {
                localStorage.setItem('accessToken', data.data['accessToken']);
                navigate('/user');
            } else {
                console.error(
                    'Login successful, but accessToken not found in the response.',
                    data
                );
            }
        },
    });

    function handleAction() {
        const user: LoginUser = {
            email: userFormData.email.trim(),
            password: userFormData.password.trim(),
        };

        if (!user.email || !user.password) {
            alert('Email and password are required.');
            return;
        }

        mutation.mutate(user);
    }

    function handleOnCHange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setUserFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleReset() {
        setUserFormData({
            email: '',
            password: '',
        });
    }

    return {
        handleReset,
        handleOnCHange,
        handleAction,
        mutation,
        userFormData,
    };
}
