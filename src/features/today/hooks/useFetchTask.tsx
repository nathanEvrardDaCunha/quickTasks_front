import { useQuery } from '@tanstack/react-query';
import type {
    FetchTask,
    FetchTaskError,
    FetchTaskSuccess,
} from '../types/typeFetchTask';
import Task from '../../../components/Task';
import { ApiClient } from '../../../utils/apiClient';

export default function useFetchTask() {
    const query = useQuery({
        queryKey: ['getTodayTask'],
        queryFn: async () => {
            const response = await ApiClient.makeAuthenticatedRequest(
                `http://localhost:5003/api/task/today`,
                { method: 'GET' }
            );

            if (!response.ok) {
                const errorData: FetchTaskError = await response.json();
                throw new Error(
                    errorData.cause || errorData.name || 'Failed to fetch tasks'
                );
            }

            console.log('fetch task success');
            return (await response.json()) as FetchTaskSuccess;
        },
        enabled: true,
        retry: (failureCount, error) => {
            // Don't retry auth errors
            if (error.message.includes('Authentication failed')) {
                return false;
            }
            return failureCount < 2;
        },
    });

    function displayNonCompletedTask(tasks: FetchTask[]) {
        const newTasks: FetchTask[] = tasks.filter((task) => !task.completed);

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
