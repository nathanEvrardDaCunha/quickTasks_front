import { useState } from 'react';
import type {
    CreateTask,
    CreateTaskError,
    CreateTaskSuccess,
} from '../types/typeCreateTask';
import { useMutation } from '@tanstack/react-query';

export default function useCreateTask(query) {
    const [createTaskData, setCreateTaskData] = useState<CreateTask>({
        accessToken: '',
        title: '',
        description: '',
        project: '',
        deadline: '',
    });

    const mutation = useMutation({
        mutationKey: ['postTask'],
        mutationFn: async (task: CreateTask) => {
            const result = await fetch(`http://localhost:5003/api/task/task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!result.ok) {
                const errorData: CreateTaskError = await result.json();
                throw errorData;
            }

            return (await result.json()) as CreateTaskSuccess;
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
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            throw new Error(
                `Couldn't find any accessToken value in localStorage !`
            );
        }

        const task: CreateTask = {
            accessToken: accessToken,
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
