import type { ReactElement } from 'react';
import type { FetchTask } from '../types/typeFetchTask';

interface FetchTaskStatusMessageProps {
    query: any;
    displayNonCompletedTask: (tasks: FetchTask[]) => ReactElement;
}

export default function FetchTaskStatusMessage({
    query,
    displayNonCompletedTask,
}: FetchTaskStatusMessageProps) {
    if (query.isLoading) {
        return <p>Loading today's tasks...</p>;
    }

    if (query.isError) {
        return (
            <h2>Error: {query.error.message || 'Failed to fetch tasks'} </h2>
        );
    }

    if (query.isSuccess && query.data && query.data.data.length > 0) {
        return displayNonCompletedTask(query.data.data);
    }

    if (!query.isLoading && !query.isError) {
        return <p>No tasks for today!</p>;
    }

    return null;
}
