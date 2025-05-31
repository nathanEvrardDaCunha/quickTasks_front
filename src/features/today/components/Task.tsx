import {
    type QueryObserverResult,
    type RefetchOptions,
} from '@tanstack/react-query';

import useDeleteTask from '../hooks/useDeleteTask';
import useCompleteTask from '../hooks/useCompleteTask';
import useUpdateTask from '../hooks/useUpdateTask';

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
    const {
        isUpdating,
        createTaskData,
        updateMutation,
        updateTaskStatusMessage,
        handleAction,
        handleOnChange,
        handleOnUpdateChange,
        handleReset,
    } = useUpdateTask(props);

    //
    //
    //
    //
    //

    const { handleOnDeleteClick } = useDeleteTask(props.task.id, props.query);

    //
    //
    //
    //
    //

    const { handleOnCompleteClick } = useCompleteTask(
        props.task.id,
        props.query
    );

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
