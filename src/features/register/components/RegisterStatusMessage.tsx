import type { UseMutationResult } from '@tanstack/react-query';
import type {
    RegisterError,
    RegisterSuccess,
    RegisterUser,
} from '../types/typeRegister';
import Status from '../../../components/composed/Status';

interface RegisterStatusMessageProps {
    mutation: UseMutationResult<
        RegisterSuccess,
        RegisterError,
        RegisterUser,
        unknown
    >;
}

export default function RegisterStatusMessage({
    mutation,
}: RegisterStatusMessageProps) {
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
                : (mutation.error as RegisterError).cause;
        return <Status variant={'error'}>{errorMessage}</Status>;
    }

    return null;
}
