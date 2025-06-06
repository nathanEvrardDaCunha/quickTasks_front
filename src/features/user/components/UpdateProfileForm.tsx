import type { ChangeEvent } from 'react';
import type {
    UpdateProfile,
    UpdateProfileError,
    UpdateProfileSuccess,
} from '../types/typeUpdateProfile';
import type { UseMutationResult } from '@tanstack/react-query';

interface UpdateProfileFormProps {
    handleAction: (formData: FormData) => void;
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleReset: () => void;
    mutation: UseMutationResult<
        UpdateProfileSuccess,
        UpdateProfileError,
        UpdateProfile,
        unknown
    >;
    userFormData: UpdateProfile;
}

export default function UpdateProfileForm({
    handleAction,
    handleOnChange,
    handleReset,
    mutation,
    userFormData,
}: UpdateProfileFormProps) {
    return (
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
    );
}
