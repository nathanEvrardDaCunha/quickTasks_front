import { useMutation } from '@tanstack/react-query';
import { useState, type ChangeEvent } from 'react';
import { apiClient } from '../../../hooks/ApiClient';
import type {
    UpdateProfile,
    UpdateProfileSuccess,
    UpdateProfileError,
} from '../types/typeUpdateProfile';

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

export default function useUpdateProfile() {
    const [userFormData, setUserFormData] = useState<UpdateProfile>({
        username: '',
        email: '',
    });

    const mutation = useMutation({
        mutationKey: ['userUpdateProfile'],
        mutationFn: async (user: UpdateProfile) => {
            return (await apiClient.updateProfile(
                user
            )) as UpdateProfileSuccess;
        },
        onError: (error: UpdateProfileError) => {
            console.error(`${error.name}: ${error.cause}`);
        },
    });

    function handleAction(formData: FormData): void {
        const username = formData.get('username');
        const email = formData.get('email');

        throwErrorIfFalsy(username, 'username');
        throwErrorIfFalsy(email, 'email');

        const profile: UpdateProfile = {
            username: username as string,
            email: email as string,
        };

        mutation.mutate(profile);
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
            username: '',
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
