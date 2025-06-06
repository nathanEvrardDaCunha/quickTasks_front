import type { ChangeEvent } from 'react';
import type { ChangePasswordType } from '../types/typeChangePassword';

interface ChangePasswordFormProps {
    handleAction: () => void;
    userFormData: ChangePasswordType;
    handleOnChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

export default function ChangePasswordForm({
    handleAction,
    userFormData,
    handleOnChange,
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

            <button type="submit">Submit</button>
        </form>
    );
}
