import { useState } from 'react';
import type {
    RegisterError,
    RegisterResponse,
    RegisterUser,
} from '../types/typeRegister';
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

export default function useRegister() {
    const [userFormData, setUserFormData] = useState<RegisterUser>({
        username: '',
        email: '',
        password: '',
    });

    const mutation = useMutation({
        mutationKey: ['registerUser'],
        mutationFn: async (user: RegisterUser) => {
            const result = await fetch(
                `http://localhost:5003/api/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                }
            );

            if (!result.ok) {
                const errorData: RegisterError = await result.json();
                throw errorData;
            }

            return (await result.json()) as RegisterResponse;
        },
        onError: (error: RegisterError) => {
            console.error(`${error.name}: ${error.cause}`);
        },
        onSuccess: () => {
            // TO-CONSIDER: Redirect to the 'login' page automatically ?

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

    function handleOnChange(event: any) {
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
