import type { UseMutationResult } from '@tanstack/react-query';
import type { RegisterError, RegisterResponse } from '../types/typeRegister';

interface RegisterStatusMessageProps {
    mutation: UseMutationResult<RegisterResponse, RegisterError>;
}

export default function RegisterStatusMessage({
    mutation,
}: RegisterStatusMessageProps) {
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
                : (mutation.error as RegisterError).cause;
        return <h2>Error: {errorMessage}</h2>;
    }

    return null;
}
