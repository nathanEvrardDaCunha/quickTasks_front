import { useState, type ChangeEvent, type JSX } from 'react';
import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import type {
    UpdateProfile,
    UpdateProfileError,
    UpdateProfileSuccess,
} from './types/typeUpdateProfile';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../hooks/ApiClient';

// Maybe use AI rewrite every sentence in the project to be more professional (error ; success ; form label ; form description...)
// Maybe use AI rewrite every sentence in the back to be more professional (error ; success...)

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

export default function UserUpdateProfile() {
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

    function updateStatusMessage(): JSX.Element | null {
        {
            if (mutation.isPending) {
                return <h2>Action processing...</h2>;
            }

            if (mutation.isSuccess && mutation.data) {
                return <h2>Success: {mutation.data.message}</h2>;
            }

            if (mutation.error) {
                const errorMessage =
                    mutation.error instanceof Error
                        ? mutation.error.message
                        : (mutation.error as UpdateProfileError).cause;
                return <h2>Error: {errorMessage}</h2>;
            }

            return null;
        }
    }

    return (
        <>
            <Header />
            <main>
                <h1>User Update Profile</h1>

                {updateStatusMessage()}

                <form action={handleAction}>
                    <fieldset>
                        <legend>User Profile Update</legend>

                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={userFormData.username}
                            onChange={handleOnChange}
                            required
                        />

                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={userFormData.email}
                            onChange={handleOnChange}
                            required
                        />

                        <button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Submitting...' : 'Submit'}
                        </button>
                        <button type="button" onClick={handleReset}>
                            Reset
                        </button>
                    </fieldset>
                </form>
            </main>
            <Footer />
        </>
    );
}
