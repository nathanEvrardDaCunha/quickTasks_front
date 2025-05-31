import type { ChangeEvent } from 'react';
import type { CreateTask } from '../types/typeCreateTask';

interface CreateTaskFormProps {
    handleAction: any;
    handleOnChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleReset: () => void;
    mutation: any;
    createTaskData: CreateTask;
}

export default function CreateTaskForm({
    handleAction,
    handleOnChange,
    handleReset,
    mutation,
    createTaskData,
}: CreateTaskFormProps) {
    return (
        <>
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

                    <button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Submitting...' : 'Submit'}
                    </button>

                    <button type="button" onClick={handleReset}>
                        Reset
                    </button>
                </fieldset>
            </form>
        </>
    );
}
