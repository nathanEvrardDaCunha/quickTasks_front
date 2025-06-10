import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type {
    RegisterError,
    RegisterSuccess,
    RegisterUser,
} from '../types/typeRegister';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../hooks/ApiClient';
import { useNavigate } from 'react-router-dom';

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
        termsAccepted: false,
    });
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['registerUser'],
        mutationFn: async (user: RegisterUser) => {
            return (await apiClient.register(user)) as RegisterSuccess;
        },
        onSuccess: () => {
            navigate('/login');
        },
        onError: (error: RegisterError) => {
            console.error(`${error.name}: ${error.cause}`);
        },
    });

    function handleAction(formData: FormData) {
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const termsAccepted = formData.get('termsAccepted');

        throwErrorIfFalsy(username, 'username');
        throwErrorIfFalsy(email, 'email');
        throwErrorIfFalsy(password, 'password');
        throwErrorIfFalsy(termsAccepted, 'terms acceptance');

        const user: RegisterUser = {
            username: username as string,
            email: email as string,
            password: password as string,
            termsAccepted: termsAccepted === 'on',
        };

        mutation.mutate(user);
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value, type, checked } = event.target;
        setUserFormData((previous) => ({
            ...previous,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    function handleReset() {
        setUserFormData({
            username: '',
            email: '',
            password: '',
            termsAccepted: false,
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
