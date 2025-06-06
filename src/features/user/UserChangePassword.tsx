import { useState, type ChangeEvent } from 'react';
import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { apiClient } from '../../hooks/ApiClient';
import type {
    ChangePasswordError,
    ChangePasswordSuccess,
    ChangePasswordType,
} from './types/typeChangePassword';

// For each form:
// - Add a placeholder if possible
// - Add a <p> description for each field if possible

export default function UserChangePassword() {
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

    function ChangePasswordStatus(
        mutation: UseMutationResult<
            ChangePasswordSuccess,
            ChangePasswordError,
            ChangePasswordType,
            unknown
        >
    ) {
        if (mutation.isPending) {
            return <h2>Action processing...</h2>;
        }

        if (mutation.isSuccess && mutation.data) {
            return (
                <h2>
                    Success: {(mutation.data as { message: string }).message}
                </h2>
            );
        }

        if (mutation.error) {
            const errorMessage =
                mutation.error instanceof Error
                    ? mutation.error.message
                    : (mutation.error as ChangePasswordError).cause;
            return <h2>Error: {errorMessage}</h2>;
        }

        return null;
    }

    return (
        <>
            <Header />
            <main>
                <h1>User Change Password</h1>

                {ChangePasswordStatus(mutation)}

                <form action={handleAction}>
                    <legend>User change password</legend>

                    <label htmlFor="password">Password</label>
                    <p>Write the new password you desire</p>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={userFormData.password}
                        onChange={handleOnChange}
                    />

                    <button type="submit">Submit</button>
                </form>
            </main>
            <Footer />
        </>
    );
}
