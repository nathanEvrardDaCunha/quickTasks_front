import { useState } from 'react';
import type {
    CreateTaskData,
    CreateTaskError,
    CreateTaskSuccess,
} from '../types/typeCreateTask';
import { useMutation } from '@tanstack/react-query';
import { ApiClient } from '../../../utils/apiClient';

export default function useCreateTask(query: any) {
    const [createTaskData, setCreateTaskData] = useState<CreateTaskData>({
        title: '',
        description: '',
        project: '',
        deadline: '',
    });

    const mutation = useMutation({
        mutationKey: ['postTask'],
        mutationFn: async (task: CreateTaskData) => {
            const response = await ApiClient.makeAuthenticatedRequest(
                `http://localhost:5003/api/task/task`,
                {
                    method: 'POST',
                    body: JSON.stringify(task),
                }
            );

            if (!response.ok) {
                const errorData: CreateTaskError = await response.json();
                throw new Error(
                    errorData.cause || errorData.name || 'Failed to create task'
                );
            }

            return (await response.json()) as CreateTaskSuccess;
        },
        onSuccess() {
            handleReset();
            console.log('create task success');
            query.refetch();
        },
        onError(error: any) {
            console.log('create task error');
            console.error(error.message);
        },
    });

    async function handleAction(formData: FormData) {
        const task: CreateTaskData = {
            title: createTaskData.title.trim(),
            description: createTaskData.description.trim(),
            project: createTaskData.project.trim(),
            deadline: createTaskData.deadline,
        };

        // Validate that fields aren't just whitespace
        if (
            !task.title ||
            !task.description ||
            !task.project ||
            !task.deadline
        ) {
            throw new Error(
                'All fields are required and cannot be empty or just whitespace'
            );
        }

        mutation.mutate(task);
    }

    function handleOnChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;
        setCreateTaskData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleReset() {
        setCreateTaskData({
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
