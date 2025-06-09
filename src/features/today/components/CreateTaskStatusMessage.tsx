import type { UseMutationResult } from '@tanstack/react-query';
import type {
    CreateTask,
    CreateTaskError,
    CreateTaskSuccess,
} from '../types/typeCreateTask';
import Status from '../../../components/composed/Status';

interface CreateTaskStatusMessageProps {
    mutation: UseMutationResult<
        CreateTaskSuccess,
        CreateTaskError,
        Omit<CreateTask, 'accessToken'>,
        unknown
    >;
}

export default function CreateTaskStatusMessage({
    mutation,
}: CreateTaskStatusMessageProps) {
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
                : (mutation.error as CreateTaskError).cause;
        return <Status variant={'error'}>{errorMessage}</Status>;
    }

    return null;
}
