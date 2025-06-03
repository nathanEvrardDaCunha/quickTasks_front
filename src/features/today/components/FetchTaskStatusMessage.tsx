import type { ReactElement } from 'react';
import type { FetchTask, FetchTaskSuccess } from '../types/typeFetchTask';
import type { UseQueryResult } from '@tanstack/react-query';
import TaskLogic from '../TaskLogic';

interface FetchTaskStatusMessageProps {
    query: UseQueryResult<FetchTaskSuccess, Error>;
    project: string;
    completed: string;
    minDate: string;
    maxDate: string;
}

export default function FetchTaskStatusMessage({
    query,
    project,
    completed,
    minDate,
    maxDate,
}: FetchTaskStatusMessageProps) {
    function displayNonCompletedTask(
        tasks: FetchTask[],
        project: string,
        completed: string,
        minDate: string,
        maxDate: string
    ): ReactElement {
        let newTasks: FetchTask[] = tasks;

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
            newTasks = newTasks.filter((task) => task.project === project);
        }

        newTasks = newTasks.filter((task) => {
            const newTaskDate = new Date(task.deadline);
            const newMinDate = new Date(minDate);
            const newMaxDate = new Date(maxDate);

            if (newMinDate <= newTaskDate && newTaskDate <= newMaxDate) {
                return task;
            }
        });

        return (
            <ul>
                {newTasks.map((task) => (
                    <TaskLogic key={task.id} task={task} query={query} />
                ))}
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
        return displayNonCompletedTask(
            query.data.data,
            project,
            completed,
            minDate,
            maxDate
        );
    }

    if (!query.isLoading && !query.isError) {
        return <p>No tasks for today!</p>;
    }

    return null;
}
