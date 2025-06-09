import type { UseMutationResult } from '@tanstack/react-query';
import type {
    ChangePasswordSuccess,
    ChangePasswordError,
    ChangePasswordType,
} from '../types/typeChangePassword';
import Status from '../../../components/composed/Status';

interface ChangePasswordStatusProps {
    mutation: UseMutationResult<
        ChangePasswordSuccess,
        ChangePasswordError,
        ChangePasswordType,
        unknown
    >;
}

export default function ChangePasswordStatus({
    mutation,
}: ChangePasswordStatusProps) {
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
