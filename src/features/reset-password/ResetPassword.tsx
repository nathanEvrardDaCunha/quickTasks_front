import { useState, type ChangeEvent } from 'react';
import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import { useMutation } from '@tanstack/react-query';
import type {
    ResetPasswordError,
    ResetPasswordSuccess,
    ResetPasswordType,
} from './typeResetPassword';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
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

    function handleAction() {
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

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setUserFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleReset() {
        setUserFormData({
            email: '',
        });
    }

    return (
        <>
            <Header />

            <main>
                <h1>Reset Password Page</h1>

                <form action={handleAction}>
                    <fieldset>
                        <legend>User Reset Password</legend>

                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required={true}
                            value={userFormData.email}
                            onChange={handleOnChange}
                        />

                        <Link to={'/login'}>Go back to Login</Link>

                        <div>
                            <button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending
                                    ? 'Submitting...'
                                    : 'Submit'}
                            </button>
                            <button type="button" onClick={handleReset}>
                                Reset
                            </button>
                        </div>
                    </fieldset>
                </form>
            </main>

            <Footer />
        </>
    );
}
