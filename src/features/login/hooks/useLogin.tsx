import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { LoginError, LoginResponse, LoginUser } from '../types/loginType';
import { useMutation } from '@tanstack/react-query';

export default function useLogin() {
    const [userFormData, setUserFormData] = useState<LoginUser>({
        email: '',
        password: '',
    });

    const mutation = useMutation({
        mutationKey: ['loginUser'],
        mutationFn: async (user: LoginUser): Promise<LoginResponse> => {
            const response = await fetch(
                `http://localhost:5003/api/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                    credentials: 'include',
                }
            );

            if (!response.ok) {
                const errorData: LoginError = await response.json();
                throw new Error(
                    errorData.cause || errorData.name || 'Failed to create task'
                );
            }

            return (await response.json()) as LoginResponse;
        },
        // Error here is always undefined
        onError: (error: LoginError) => {
            console.error(`${error.name}: ${error.cause}`);
        },
        onSuccess: (data: LoginResponse) => {
            localStorage.setItem('accessToken', data.data['accessToken']);

            // TO-CONSIDER: Redirect to the 'today' page automatically ?

            handleReset();
        },
    });

    function handleAction() {
        const user: LoginUser = {
            email: userFormData.email.trim(),
            password: userFormData.password.trim(),
        };

        if (!user.email || !user.password) {
            throw new Error(
                'All fields are required and cannot be empty or just whitespace'
            );
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
