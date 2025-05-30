interface TaskProps {
    task: {
        id: number;
        title: string;
        description: string;
        project: string;
        deadline: Date;
        completed: boolean;
    };
    query: QueryType;
}

import {
    useMutation,
    type QueryObserverResult,
    type RefetchOptions,
} from '@tanstack/react-query';
import { apiClient } from '../hooks/ApiClient';
import type { CreateTaskError } from '../features/today/types/typeCreateTask';

type QueryType = {
    refetch: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult>;
};

function Task(props: TaskProps) {
    const { id, title, description, project, deadline } = props.task;
    const query = props.query;

    const mutation = useMutation({
        mutationKey: ['completeSingleTask'],
        mutationFn: async (taskId: number) => {
            return await apiClient.completeSingleTask({ id: taskId });
        },
        onSuccess() {
            console.log('Task made query refetch.');
            console.log(`Task id: ${id}.`);
            query.refetch();
        },
        onError(error: CreateTaskError) {
            console.log(`${error.name}: ${error.cause}`);
        },
    });

    function handleOnClick(): void {
        mutation.mutate(id);
    }

    return (
        <li key={id}>
            <h4>{title}</h4>

            {description && <p>{description}</p>}

            {project && <p>{project}</p>}

            <time dateTime={deadline.toString()}>{deadline.toString()}</time>
            <button type="button" onClick={handleOnClick}>
                Complete
            </button>
        </li>
    );
}

export default Task;
