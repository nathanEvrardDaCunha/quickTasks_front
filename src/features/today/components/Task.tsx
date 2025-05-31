import {
    useMutation,
    type QueryObserverResult,
    type RefetchOptions,
} from '@tanstack/react-query';

import { useState, type ChangeEvent, type JSX } from 'react';
import useDeleteTask from '../hooks/useDeleteTask';
import type { CreateTask, CreateTaskError } from '../types/typeCreateTask';
import { apiClient } from '../../../hooks/ApiClient';

interface TaskProps {
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

function Task(props: TaskProps) {
    // const { id, title, description, project, deadline } = props.task;

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
            return await apiClient.updateTask(task, props.task.id);
        },
        onSuccess() {
            console.log('Update Task');
            // handleReset();
            setIsUpdating(false);
            query.refetch(); // Useless ?
        },
        onError(error: CreateTaskError) {
            console.error(`${error.name}: ${error.cause}`);
        },
    });

    function handleAction() {
        const task = {
            title: createTaskData.title,
            description: createTaskData.description,
            project: createTaskData.project,
            deadline: createTaskData.deadline,
        };

        updateMutation.mutate(task);
    }

    function handleOnUpdateChange(event) {
        setIsUpdating((previous) => !previous);
    }

    function handleOnChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;
        setCreateTaskData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleReset() {
        setCreateTaskData({
            accessToken: '',
            title: props.task.title,
            description: props.task.description,
            project: props.task.project,
            deadline: props.task.deadline.toString().split('T')[0],
        });
    }

    function updateTaskStatusMessage(): JSX.Element {
        if (updateMutation.isPending) {
            return <p>Loading update tasks...</p>;
        }

        if (updateMutation.isError) {
            return (
                <h2>
                    Error:{' '}
                    {updateMutation.error.cause || 'Failed to update task'}{' '}
                </h2>
            );
        }

        if (updateMutation.isSuccess) {
            return <h2>Update task successfully</h2>;
        }

        return <p>No Update yet !</p>;
    }

    //
    //
    //
    //
    //

    // {
    //     handleOnDeleteClick, deleteMutation
    // } = useDeleteTask(props.task.id, query);

    const { handleOnDeleteClick } = useDeleteTask(props.task.id, props.query);

    //
    //
    //
    //
    //
    const query = props.query;

    const completeMutation = useMutation({
        mutationKey: ['completeSingleTask'],
        mutationFn: async (taskId: number) => {
            return await apiClient.completeSingleTask({ id: taskId });
        },
        onSuccess() {
            query.refetch();
        },
        onError(error: CreateTaskError) {
            console.error(`${error.name}: ${error.cause}`);
        },
    });

    function handleOnCompleteClick(): void {
        completeMutation.mutate(props.task.id);
    }

    return (
        <li key={props.task.id}>
            {isUpdating === true ? (
                <>
                    {updateTaskStatusMessage()}

                    <form action={handleAction}>
                        <fieldset>
                            <legend>Task Creation</legend>

                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                required={true}
                                value={createTaskData.title}
                                onChange={handleOnChange}
                            />

                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                cols={30}
                                rows={10}
                                required={false}
                                value={createTaskData.description}
                                onChange={handleOnChange}
                            ></textarea>

                            <label htmlFor="project">Project</label>
                            <input
                                type="text"
                                name="project"
                                id="project"
                                required={false}
                                value={createTaskData.project}
                                onChange={handleOnChange}
                            />

                            <label htmlFor="deadline">Deadline</label>
                            <input
                                type="date"
                                name="deadline"
                                id="deadline"
                                required={true}
                                value={createTaskData.deadline}
                                onChange={handleOnChange}
                            />

                            <button
                                type="button"
                                onClick={handleOnUpdateChange}
                            >
                                Close
                            </button>

                            <button
                                type="submit"
                                disabled={updateMutation.isPending}
                            >
                                {updateMutation.isPending
                                    ? 'Submitting...'
                                    : 'Submit'}
                            </button>

                            <button type="button" onClick={handleReset}>
                                Reset
                            </button>
                        </fieldset>
                    </form>
                </>
            ) : (
                <>
                    <h4>{props.task.title}</h4>

                    {props.task.description && <p>{props.task.description}</p>}

                    {props.task.project && <p>{props.task.project}</p>}

                    <time
                        dateTime={props.task.deadline.toString().split('T')[0]}
                    >
                        {props.task.deadline.toString().split('T')[0]}
                    </time>
                    <button type="button" onClick={handleOnUpdateChange}>
                        Update
                    </button>
                    <button type="button" onClick={handleOnCompleteClick}>
                        Complete
                    </button>
                    <button type="button" onClick={handleOnDeleteClick}>
                        Delete
                    </button>
                </>
            )}
        </li>
    );
}

export default Task;
