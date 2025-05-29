import type { UseMutationResult } from '@tanstack/react-query';
import type { LoginError, LoginResponse } from '../types/loginType';

interface LoginStatusMessageProps {
    mutation: UseMutationResult<LoginResponse, LoginError>;
}

export default function LoginStatusMessage({
    mutation,
}: LoginStatusMessageProps) {
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
                : (mutation.error as LoginError).cause;
        return <h2>Error: {errorMessage}</h2>;
    }

    return null;
}
