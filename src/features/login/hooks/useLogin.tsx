import { useState } from 'react';
import type { LoginError, LoginResponse, LoginUser } from '../types/loginType';
import { useMutation } from '@tanstack/react-query';

function throwErrorIfFalsy(
    value: FormDataEntryValue | null,
    valueName: string
) {
    if (!value) {
        throw new Error(
            `Couldn't find the ${valueName} property of the form !`
        );
    }
}

export default function useLogin() {
    const [userFormData, setUserFormData] = useState<LoginUser>({
        email: '',
        password: '',
    });

    const mutation = useMutation({
        mutationKey: ['loginUser'],
        mutationFn: async (user: LoginUser) => {
            const result = await fetch(`http://localhost:5003/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!result.ok) {
                const errorData: LoginError = await result.json();
                throw errorData;
            }

            return (await result.json()) as LoginResponse;
        },
        onError: (error: LoginError) => {
            console.error(`${error.name}: ${error.cause}`);
        },
        onSuccess: (data: LoginResponse) => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('userId', data.userId.toString());

            // TO-CONSIDER: Redirect to the 'today' page automatically ?

            handleReset();
        },
    });

    function handleAction(formData: FormData) {
        const email = formData.get('email');
        const password = formData.get('password');

        throwErrorIfFalsy(email, 'email');
        throwErrorIfFalsy(password, 'password');

        const user: LoginUser = {
            email: email as string,
            password: password as string,
        };

        mutation.mutate(user);
    }

    function handleOnCHange(event: any) {
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
