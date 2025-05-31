import type { CreateTask } from '../types/typeCreateTask';

interface UpdateTaskFormProps {
    handleAction: () => void;
    createTaskData: CreateTask;
    handleOnChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleOnUpdateChange: () => void;
    updateMutation: any;
    handleReset: () => void;
}

export default function UpdateTaskForm(props: UpdateTaskFormProps) {
    return (
        <form action={props.handleAction}>
            <fieldset>
                <legend>Task Creation</legend>

                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    required={true}
                    value={props.createTaskData.title}
                    onChange={props.handleOnChange}
                />

                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    cols={30}
                    rows={10}
                    required={false}
                    value={props.createTaskData.description}
                    onChange={props.handleOnChange}
                ></textarea>

                <label htmlFor="project">Project</label>
                <input
                    type="text"
                    name="project"
                    id="project"
                    required={false}
                    value={props.createTaskData.project}
                    onChange={props.handleOnChange}
                />

                <label htmlFor="deadline">Deadline</label>
                <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    required={true}
                    value={props.createTaskData.deadline}
                    onChange={props.handleOnChange}
                />

                <button type="button" onClick={props.handleOnUpdateChange}>
                    Close
                </button>

                <button type="submit" disabled={props.updateMutation.isPending}>
                    {props.updateMutation.isPending
                        ? 'Submitting...'
                        : 'Submit'}
                </button>

                <button type="button" onClick={props.handleReset}>
                    Reset
                </button>
            </fieldset>
        </form>
    );
}
