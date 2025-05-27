import type { CreateTaskError } from '../types/typeCreateTask';

export default function CreateTaskStatusMessage({ mutation }) {
    if (mutation.isPending) {
        return <h2>Action processing...</h2>;
    }

    if (mutation.isSuccess && mutation.data) {
        return <h2>Success: {mutation.data.message}</h2>;
    }

    if (mutation.error) {
        return (
            <h2>
                Error:{' '}
                {(mutation.error as CreateTaskError).cause ||
                    mutation.error.message}
            </h2>
        );
    }

    return null;
}
