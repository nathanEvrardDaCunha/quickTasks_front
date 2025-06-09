import type { UseMutationResult } from '@tanstack/react-query';
import Status from '../../../components/composed/Status';
import type {
    ResetPasswordError,
    ResetPasswordSuccess,
    ResetPasswordType,
} from '../types/typeResetPassword';

interface ResetPasswordMessageProps {
    mutation: UseMutationResult<
        ResetPasswordSuccess,
        ResetPasswordError,
        ResetPasswordType,
        unknown
    >;
}

export default function ResetPasswordMessage({
    mutation,
}: ResetPasswordMessageProps) {
    if (mutation.isPending) {
        return <Status variant={'pending'}>Action processing...</Status>;
    }

    if (mutation.isSuccess && mutation.data) {
        return <Status variant={'success'}>{mutation.data.message}</Status>;
    }

    if (mutation.error) {
        const errorMessage =
            mutation.error instanceof Error
                ? mutation.error.message
                : (mutation.error as ResetPasswordError).cause;
        return <Status variant={'error'}>{errorMessage}</Status>;
    }

    return null;
}
