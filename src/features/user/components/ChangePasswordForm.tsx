import type { ChangeEvent } from 'react';
import type {
    ChangePasswordError,
    ChangePasswordSuccess,
    ChangePasswordType,
} from '../types/typeChangePassword';
import type { UseMutationResult } from '@tanstack/react-query';

interface ChangePasswordFormProps {
    handleAction: () => void;
    userFormData: ChangePasswordType;
    handleOnChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    mutation: UseMutationResult<
        ChangePasswordSuccess,
        ChangePasswordError,
        ChangePasswordType,
        unknown
    >;
}

export default function ChangePasswordForm({
    handleAction,
    userFormData,
    handleOnChange,
    mutation,
}: ChangePasswordFormProps) {
    return (
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

            <button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
}
