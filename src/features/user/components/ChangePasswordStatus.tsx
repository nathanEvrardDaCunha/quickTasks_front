import type { UseMutationResult } from '@tanstack/react-query';
import type {
    ChangePasswordSuccess,
    ChangePasswordError,
    ChangePasswordType,
} from '../types/typeChangePassword';

interface ChangePasswordStatusProps {
    mutation: UseMutationResult<
        ChangePasswordSuccess,
        ChangePasswordError,
        ChangePasswordType,
        unknown
    >;
}

// Add type to component like "ChangePasswordStatus" everywhere ?
// Type every "any" type (in short, no more any should be in the codebase)

export default function ChangePasswordStatus({
    mutation,
}: ChangePasswordStatusProps) {
    if (mutation.isPending) {
        return <h2>Action processing...</h2>;
    }

    if (mutation.isSuccess && mutation.data) {
        return (
            <h2>Success: {(mutation.data as { message: string }).message}</h2>
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
