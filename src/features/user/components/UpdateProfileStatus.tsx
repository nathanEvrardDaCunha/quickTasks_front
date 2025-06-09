import type { UseMutationResult } from '@tanstack/react-query';
import type { ChangePasswordError } from '../types/typeChangePassword';
import type {
    UpdateProfileSuccess,
    UpdateProfileError,
    UpdateProfile,
} from '../types/typeUpdateProfile';
import Status from '../../../components/composed/Status';

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
        return <Status variant={'pending'}>Action processing...</Status>;
    }

    if (mutation.isSuccess && mutation.data) {
        return (
            <Status variant={'success'}>
                {(mutation.data as { message: string }).message}
            </Status>
        );
    }

    if (mutation.error) {
        const errorMessage =
            mutation.error instanceof Error
                ? mutation.error.message
                : (mutation.error as ChangePasswordError).cause;
        return <Status variant={'error'}>{errorMessage}</Status>;
    }

    return null;
}
