import type { UseMutationResult } from '@tanstack/react-query';
import type { LoginError, LoginSuccess, LoginUser } from '../types/loginType';
import Status from '../../../components/composed/Status';

interface LoginStatusMessageProps {
    mutation: UseMutationResult<LoginSuccess, LoginError, LoginUser, unknown>;
}

export default function LoginStatusMessage({
    mutation,
}: LoginStatusMessageProps) {
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
                : (mutation.error as LoginError).cause;
        return <Status variant={'error'}>{errorMessage}</Status>;
    }

    return null;
}
