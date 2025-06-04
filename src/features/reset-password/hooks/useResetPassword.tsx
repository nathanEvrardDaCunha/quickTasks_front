import { useMutation } from '@tanstack/react-query';
import { useState, type ChangeEvent } from 'react';
import type {
    ResetPasswordType,
    ResetPasswordError,
    ResetPasswordSuccess,
} from '../types/typeResetPassword';

export default function useResetPassword() {
    const [userFormData, setUserFormData] = useState<ResetPasswordType>({
        email: '',
    });

    const mutation = useMutation({
        mutationKey: ['resetPassword'],
        mutationFn: async (email: ResetPasswordType) => {
            const response = await fetch(
                `http://localhost:5003/api/auth/reset-password`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(email),
                    credentials: 'include',
                }
            );

            if (!response.ok) {
                const errorData: ResetPasswordError = await response.json();
                throw new Error(
                    errorData.cause || errorData.name || 'Failed to create task'
                );
            }

            return (await response.json()) as ResetPasswordSuccess;
        },
        onError: (error: ResetPasswordError) => {
            console.error(`${error.name}: ${error.cause}`);
        },
        onSuccess(data: ResetPasswordSuccess) {
            console.log(data.message);
        },
    });

    function handleAction(): void {
        const user: ResetPasswordType = {
            email: userFormData.email.trim(),
        };

        if (!user.email) {
            throw new Error(
                'All fields are required and cannot be empty or just whitespace'
            );
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
