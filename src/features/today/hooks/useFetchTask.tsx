import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import type { FetchTask } from '../types/typeFetchTask';
import { apiClient } from '../../../hooks/ApiClient';
import TaskLogic from '../TaskLogic';

export default function useFetchTask() {
    const [accessToken, setAccessToken] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setAccessToken(token);
        }
    }, []);

    const query = useQuery({
        queryKey: ['getTodayTask', accessToken],
        queryFn: async () => {
            return await apiClient.fetchTodayTasks();
        },
        enabled: Boolean(accessToken),
        refetchInterval: 5 * 60000,
    });

    function displayNonCompletedTask(tasks: FetchTask[]): ReactElement {
        const newTasks: FetchTask[] = tasks.filter((task) => !task.completed);

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

    return { query, displayNonCompletedTask };
}
