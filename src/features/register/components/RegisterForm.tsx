import type { UseMutationResult } from '@tanstack/react-query';
import type { ChangeEvent } from 'react';
import type {
    RegisterError,
    RegisterResponse,
    RegisterUser,
} from '../types/typeRegister';

interface RegisterFormProps {
    handleAction: (formData: FormData) => void;
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleReset: () => void;
    userFormDate: RegisterUser;
    mutation: UseMutationResult<RegisterResponse, RegisterError>;
}

export default function RegisterForm({
    handleAction,
    handleOnChange,
    handleReset,
    userFormDate,
    mutation,
}: RegisterFormProps) {
    return (
        <>
            <form action={handleAction}>
                <fieldset>
                    <legend>User Sign-Up</legend>

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={userFormDate.username}
                        onChange={handleOnChange}
                        required
                    />

                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={userFormDate.email}
                        onChange={handleOnChange}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={userFormDate.password}
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
        </>
    );
}
