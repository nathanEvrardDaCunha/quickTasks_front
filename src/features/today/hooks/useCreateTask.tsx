import { useState } from 'react';
import type { CreateTask, CreateTaskError } from '../types/typeCreateTask';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../hooks/ApiClient';

export default function useCreateTask(query) {
    const [createTaskData, setCreateTaskData] = useState<CreateTask>({
        accessToken: '', // Keep this for consistency
        title: '',
        description: '',
        project: '',
        deadline: '',
    });

    const mutation = useMutation({
        mutationKey: ['postTask'],
        mutationFn: async (task: Omit<CreateTask, 'accessToken'>) => {
            return await apiClient.createTask(task);
        },
        onSuccess() {
            handleReset();
            query.refetch();
        },
        onError(error: CreateTaskError) {
            console.error(`${error.name}: ${error.cause}`);
        },
    });

    async function handleAction(formData: FormData) {
        const task = {
            title: createTaskData.title,
            description: createTaskData.description,
            project: createTaskData.project,
            deadline: createTaskData.deadline,
        };

        mutation.mutate(task);
    }

    function handleOnChange(event: any) {
        const { name, value } = event.target;
        setCreateTaskData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleReset() {
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
