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
    deadlineSort: string;
    projectSort: string;
    titleSort: string;
    descriptionSort: string;
}

export default function FetchTaskStatusMessage({
    query,
    project,
    completed,
    minDate,
    maxDate,
    deadlineSort,
    projectSort,
    titleSort,
    descriptionSort,
}: FetchTaskStatusMessageProps) {
    function displayNonCompletedTask(
        tasks: FetchTask[],
        project: string,
        completed: string,
        minDate: string,
        maxDate: string,
        deadlineSort: string,
        projectSort: string,
        titleSort: string,
        descriptionSort: string
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

        if (deadlineSort === 'ascending') {
            newTasks = newTasks.sort((a, b) => {
                const dateA = new Date(a.deadline);
                const dateB = new Date(b.deadline);
                return dateA.getTime() - dateB.getTime();
            });
        } else if (deadlineSort === 'descending') {
            newTasks = newTasks.sort((a, b) => {
                const dateA = new Date(a.deadline);
                const dateB = new Date(b.deadline);
                return dateB.getTime() - dateA.getTime();
            });
        }

        if (projectSort === 'ascending') {
            newTasks = newTasks.sort((a, b) => {
                const projectA = a.project || '';
                const projectB = b.project || '';
                return projectA.localeCompare(projectB);
            });
        } else if (projectSort === 'descending') {
            newTasks = newTasks.sort((a, b) => {
                const projectA = a.project || '';
                const projectB = b.project || '';
                return projectB.localeCompare(projectA);
            });
        }

        if (titleSort === 'ascending') {
            newTasks = newTasks.sort((a, b) => {
                const titleA = a.title || '';
                const titleB = b.title || '';
                return titleA.localeCompare(titleB);
            });
        } else if (titleSort === 'descending') {
            newTasks = newTasks.sort((a, b) => {
                const titleA = a.title || '';
                const titleB = b.title || '';
                return titleB.localeCompare(titleA);
            });
        }

        if (descriptionSort === 'ascending') {
            newTasks = newTasks.sort((a, b) => {
                const descA = a.description || '';
                const descB = b.description || '';
                return descA.localeCompare(descB);
            });
        } else if (descriptionSort === 'descending') {
            newTasks = newTasks.sort((a, b) => {
                const descA = a.description || '';
                const descB = b.description || '';
                return descB.localeCompare(descA);
            });
        }

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

    // When there s no task, the project filter is "" instead of "all"

    if (query.isSuccess && query.data && query.data.data.length > 0) {
        return displayNonCompletedTask(
            query.data.data,
            project,
            completed,
            minDate,
            maxDate,
            deadlineSort,
            projectSort,
            titleSort,
            descriptionSort
        );
    }

    if (!query.isLoading && !query.isError) {
        return <p>No tasks for today!</p>;
    }

    return null;
}
