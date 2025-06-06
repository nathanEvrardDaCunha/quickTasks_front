import { useState, type ChangeEvent } from 'react';
import type {
    ChangePasswordError,
    ChangePasswordSuccess,
    ChangePasswordType,
} from '../types/typeChangePassword';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../hooks/ApiClient';

export default function useChangePassword() {
    const [userFormData, setUserFormData] = useState<ChangePasswordType>({
        password: '',
    });

    const mutation = useMutation({
        mutationKey: ['changePassword'],
        mutationFn: async (password: ChangePasswordType) => {
            return (await apiClient.changePassword(
                password
            )) as ChangePasswordSuccess;
        },
        onError(error: ChangePasswordError) {
            console.error(`${error.name}: ${error.cause}`);
        },
    });

    function handleOnChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
        const { name, value } = event.target;
        setUserFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleAction(): void {
        mutation.mutate(userFormData);
    }

    function handleReset(): void {
        setUserFormData({
            password: '',
        });
    }

    return {
        handleAction,
        handleOnChange,
        mutation,
        userFormData,
        handleReset,
    };
}
