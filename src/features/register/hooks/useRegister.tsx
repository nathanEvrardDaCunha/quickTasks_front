import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { RegisterError, RegisterUser } from '../types/typeRegister';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../hooks/ApiClient';

function throwErrorIfFalsy(
    value: FormDataEntryValue | null,
    valueName: string
): void {
    if (!value) {
        throw new Error(
            `Couldn't find the ${valueName} property of the form !`
        );
    }
}

export default function useRegister() {
    const [userFormData, setUserFormData] = useState<RegisterUser>({
        username: '',
        email: '',
        password: '',
    });

    const mutation = useMutation({
        mutationKey: ['registerUser'],
        mutationFn: async (user: RegisterUser) => {
            return await apiClient.register(user);
        },
        onError: (error: RegisterError) => {
            console.error(`${error.name}: ${error.cause}`);
        },
        onSuccess: () => {
            handleReset();
        },
    });

    function handleAction(formData: FormData) {
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        throwErrorIfFalsy(username, 'username');
        throwErrorIfFalsy(email, 'email');
        throwErrorIfFalsy(password, 'password');

        const user: RegisterUser = {
            username: username as string,
            email: email as string,
            password: password as string,
        };

        mutation.mutate(user);
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setUserFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleReset() {
        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    }

    return {
        mutation,
        handleAction,
        handleOnChange,
        handleReset,
        userFormDate: userFormData,
    };
}
