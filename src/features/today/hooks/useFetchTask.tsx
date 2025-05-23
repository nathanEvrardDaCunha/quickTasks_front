import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import type {
    FetchTask,
    FetchTaskError,
    FetchTaskSuccess,
} from '../types/typeFetchTask';
import Task from '../../../components/Task';

export default function useFetchTask() {
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            setUserId(userId);
        }
    }, []);

    // Should use useEffect or not ?
    const query = useQuery({
        queryKey: ['getTodayTask', userId],
        queryFn: async () => {
            if (!userId) {
                throw new Error(
                    `Cannot process today task fetch because no user Id has been found in localStorage !`
                );
            }

            const result = await fetch(
                `http://localhost:5003/api/task/today?userId=${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!result.ok) {
                const errorData: FetchTaskError = await result.json();
                throw errorData;
            }

            return (await result.json()) as FetchTaskSuccess;
        },

        enabled: Boolean(userId),
    });

    function displayNonCompletedTask(tasks: FetchTask[]) {
        const newTasks: FetchTask[] = tasks.filter((task) => {
            if (!task.completed) {
                return task;
            }
        });

        /* Add logic to complete task afterward */
        return (
            <ul>
                {newTasks.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            task={task}
                            handleOnClick={undefined}
                        />
                    );
                })}
            </ul>
        );
    }

    return { query, displayNonCompletedTask };
}
