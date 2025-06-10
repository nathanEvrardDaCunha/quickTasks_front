import { useMutation } from '@tanstack/react-query';
import { useState, type ChangeEvent } from 'react';
import type {
    ResetPasswordType,
    ResetPasswordError,
    ResetPasswordSuccess,
} from '../types/typeResetPassword';
import { apiClient } from '../../../hooks/ApiClient';

export default function useResetPassword() {
    const [userFormData, setUserFormData] = useState<ResetPasswordType>({
        email: '',
    });

    const mutation = useMutation({
        mutationKey: ['resetPassword'],
        mutationFn: (email: ResetPasswordType) => {
            return apiClient.resetPassword<ResetPasswordSuccess>(email);
        },
        onError: (error: ResetPasswordError) => {
            console.error('Password reset failed:', error);
        },
        onSuccess(data: ResetPasswordSuccess) {
            console.log('Password reset success:', data.message);
        },
    });

    function handleAction(): void {
        const user: ResetPasswordType = {
            email: userFormData.email.trim(),
        };

        if (!user.email) {
            alert('Email field is required.');
            return;
        }

        mutation.mutate(user);
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        setUserFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleReset(): void {
        setUserFormData({
            email: '',
        });
    }

    return {
        handleReset,
        handleOnChange,
        handleAction,
        mutation,
        userFormData,
    };
}
