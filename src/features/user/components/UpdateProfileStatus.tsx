import type { UseMutationResult } from '@tanstack/react-query';
import type { ChangePasswordError } from '../types/typeChangePassword';
import type {
    UpdateProfileSuccess,
    UpdateProfileError,
    UpdateProfile,
} from '../types/typeUpdateProfile';

interface UpdateProfileStatusProps {
    mutation: UseMutationResult<
        UpdateProfileSuccess,
        UpdateProfileError,
        UpdateProfile,
        unknown
    >;
}

export default function UpdateProfileStatus({
    mutation,
}: UpdateProfileStatusProps) {
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
