import type { CreateTaskError } from '../types/typeCreateTask';

// Replace the any by real static type

interface CreateTaskStatusMessageProps {
    mutation: any;
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
