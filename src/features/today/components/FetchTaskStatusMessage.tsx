import type { ReactElement } from 'react';
import type { FetchTask, FetchTaskSuccess } from '../types/typeFetchTask';
import type { UseQueryResult } from '@tanstack/react-query';
import TaskLogic from '../TaskLogic';

interface FetchTaskStatusMessageProps {
    query: UseQueryResult<FetchTaskSuccess, Error>;
    project: string;
    completed: string;
}

export default function FetchTaskStatusMessage({
    query,
    project,
    completed,
}: FetchTaskStatusMessageProps) {
    function displayNonCompletedTask(
        tasks: FetchTask[],
        project: string,
        completed: string
    ): ReactElement {
        // For later completion filter
        // const newTasks: FetchTask[] = tasks.filter((task) => !task.completed);

        let newTasks: FetchTask[] = tasks;

        console.log(project);
        console.log(completed);

        if (completed === 'true') {
            newTasks = newTasks.filter((task) => {
                if (task.completed === true) {
                    return task;
                }
            });
        }

        if (completed === 'false') {
            newTasks = newTasks.filter((task) => {
                if (task.completed === false) {
                    return task;
                }
            });
        }

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

    // When there s no task, the project filter is "" isntead of "all"

    if (query.isSuccess && query.data && query.data.data.length > 0) {
        return displayNonCompletedTask(query.data.data, project, completed);
    }

    if (!query.isLoading && !query.isError) {
        return <p>No tasks for today!</p>;
    }

    return null;
}
