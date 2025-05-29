import type { UseMutationResult } from '@tanstack/react-query';
import type { CreateTaskError } from '../types/typeCreateTask';

interface CreateTaskStatusMessageProps {
    mutation: UseMutationResult<unknown, CreateTaskError>;
}

export default function CreateTaskStatusMessage({
    mutation,
}: CreateTaskStatusMessageProps) {
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
                : (mutation.error as CreateTaskError).cause;
        return <h2>Error: {errorMessage}</h2>;
    }

    return null;
}
