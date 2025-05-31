import type { ReactElement } from 'react';
import type { FetchTask, FetchTaskSuccess } from '../types/typeFetchTask';
import type { UseQueryResult } from '@tanstack/react-query';
import TaskLogic from '../TaskLogic';

interface FetchTaskStatusMessageProps {
    query: UseQueryResult<FetchTaskSuccess, Error>;
    project: string;
}

export default function FetchTaskStatusMessage({
    query,
    project,
}: FetchTaskStatusMessageProps) {
    function displayNonCompletedTask(
        tasks: FetchTask[],
        project: string
    ): ReactElement {
        // For later completion filter
        // const newTasks: FetchTask[] = tasks.filter((task) => !task.completed);

        let newTasks: FetchTask[] = tasks;

        if (project !== 'all') {
            newTasks = newTasks.filter((task) => {
                if (task.project === project) {
                    return task;
                }
            });
        }

        return (
            <ul>
                {newTasks.map((task) => {
                    return (
                        <TaskLogic key={task.id} task={task} query={query} />
                    );
                })}
            </ul>
        );
    }

    if (query.isLoading) {
        return <p>Loading today's tasks...</p>;
    }

    if (query.isError) {
        return (
            <h2>Error: {query.error.message || 'Failed to fetch tasks'} </h2>
        );
    }

    if (query.isSuccess && query.data && query.data.data.length > 0) {
        return displayNonCompletedTask(query.data.data, project);
    }

    if (!query.isLoading && !query.isError) {
        return <p>No tasks for today!</p>;
    }

    return null;
}
