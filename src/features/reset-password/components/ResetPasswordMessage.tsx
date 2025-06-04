import type { ResetPasswordError } from '../types/typeResetPassword';

interface ResetPasswordMessageProps {
    mutation: any;
}

export default function ResetPasswordMessage({
    mutation,
}: ResetPasswordMessageProps) {
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
                : (mutation.error as ResetPasswordError).cause;
        return <h2>Error: {errorMessage}</h2>;
    }

    return null;
}
