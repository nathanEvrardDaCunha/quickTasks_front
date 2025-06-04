import type { UseMutationResult } from '@tanstack/react-query';
import type { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import type {
    ResetPasswordSuccess,
    ResetPasswordError,
    ResetPasswordType,
} from '../types/typeResetPassword';

interface ResetPasswordFormProps {
    handleAction: () => void;
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleReset: () => void;
    mutation: UseMutationResult<
        ResetPasswordSuccess,
        ResetPasswordError,
        ResetPasswordType,
        unknown
    >;
    userFormData: ResetPasswordType;
}

export default function ResetPasswordForm(props: ResetPasswordFormProps) {
    return (
        <form action={props.handleAction}>
            <fieldset>
                <legend>User Reset Password</legend>

                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required={true}
                    value={props.userFormData.email}
                    onChange={props.handleOnChange}
                />

                <Link to={'/login'}>Go back to Login</Link>

                <div>
                    <button type="submit" disabled={props.mutation.isPending}>
                        {props.mutation.isPending ? 'Submitting...' : 'Submit'}
                    </button>
                    <button type="button" onClick={props.handleReset}>
                        Reset
                    </button>
                </div>
            </fieldset>
        </form>
    );
}
