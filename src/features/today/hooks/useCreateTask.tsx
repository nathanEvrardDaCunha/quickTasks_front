import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type {
    CreateTask,
    CreateTaskError,
    CreateTaskSuccess,
} from '../types/typeCreateTask';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../hooks/ApiClient';
import type {
    QueryObserverResult,
    RefetchOptions,
} from '@tanstack/react-query';

type QueryType = {
    refetch: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult>;
};

export default function useCreateTask(query: QueryType) {
    const [createTaskData, setCreateTaskData] = useState<CreateTask>({
        accessToken: '',
        title: '',
        description: '',
        project: '',
        deadline: '',
    });

    const mutation = useMutation({
        mutationKey: ['postTask'],
        mutationFn: async (task: Omit<CreateTask, 'accessToken'>) => {
            return (await apiClient.createTask(task)) as CreateTaskSuccess;
        },
        onSuccess() {
            handleReset();
            query.refetch();
        },
        onError(error: CreateTaskError) {
            console.error(`${error.name}: ${error.cause}`);
        },
    });

    function handleAction(): void {
        const task = {
            title: createTaskData.title,
            description: createTaskData.description,
            project: createTaskData.project,
            deadline: createTaskData.deadline,
        };

        mutation.mutate(task);
    }

    function handleOnChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
        const { name, value } = event.target;
        setCreateTaskData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleReset(): void {
        setCreateTaskData({
            accessToken: '',
            title: '',
            description: '',
            project: '',
            deadline: '',
        });
    }

    return {
        handleAction,
        handleOnChange,
        handleReset,
        mutation,
        createTaskData,
    };
}
