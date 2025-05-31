import {
    useMutation,
    type QueryObserverResult,
    type RefetchOptions,
} from '@tanstack/react-query';
import { apiClient } from '../../../hooks/ApiClient';
import { useState, type ChangeEvent } from 'react';
import type { CreateTask } from '../types/typeCreateTask';
import type {
    UpdateTaskError,
    UpdateTaskSuccess,
} from '../types/typeUpdateTask';

interface isUpdateTaskProps {
    task: {
        id: number;
        title: string;
        description: string;
        project: string;
        deadline: Date;
        completed: boolean;
    };
    query: QueryType;
}

type QueryType = {
    refetch: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult>;
};

export default function useUpdateTask(props: isUpdateTaskProps) {
    const [createTaskData, setCreateTaskData] = useState<CreateTask>({
        accessToken: '',
        title: props.task.title,
        description: props.task.description,
        project: props.task.project,
        deadline: props.task.deadline.toString().split('T')[0],
    });
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const updateMutation = useMutation({
        mutationKey: ['updateTask'],
        mutationFn: async (task: Omit<CreateTask, 'accessToken'>) => {
            return (await apiClient.updateTask(
                task,
                props.task.id
            )) as UpdateTaskSuccess;
        },
        onSuccess() {
            setIsUpdating(false);
            props.query.refetch(); // Useless ?
        },
        onError(error: UpdateTaskError) {
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

        updateMutation.mutate(task);
    }

    function handleOnUpdateChange(): void {
        setIsUpdating((previous) => !previous);
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
            title: props.task.title,
            description: props.task.description,
            project: props.task.project,
            deadline: props.task.deadline.toString().split('T')[0],
        });
    }

    return {
        handleReset,
        handleOnChange,
        handleOnUpdateChange,
        handleAction,
        updateMutation,
        isUpdating,
        createTaskData,
    };
}
