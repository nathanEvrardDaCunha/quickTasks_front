import {
    type QueryObserverResult,
    type RefetchOptions,
} from '@tanstack/react-query';

import useDeleteTask from '../hooks/useDeleteTask';
import useCompleteTask from '../hooks/useCompleteTask';
import useUpdateTask from '../hooks/useUpdateTask';
import UpdateTaskForm from './UpdateTaskForm';
import UpdateTaskStatusMessage from './UpdateTaskStatusMessage';

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
        handleAction,
        handleOnChange,
        handleOnUpdateChange,
        handleReset,
    } = useUpdateTask(props);

    const { handleOnDeleteClick } = useDeleteTask(props.task.id, props.query);

    const { handleOnCompleteClick } = useCompleteTask(
        props.task.id,
        props.query
    );

    // <CreateTaskStatusMessage mutation={mutation} />

    // <CreateTaskForm
    //     handleAction={handleAction}
    //     handleOnChange={handleOnChange}
    //     handleReset={handleReset}
    //     mutation={mutation}
    //     createTaskData={createTaskData}
    // />

    // <FetchTaskStatusMessage
    //     query={query}
    //     displayNonCompletedTask={displayNonCompletedTask}
    // />

    return (
        <li key={props.task.id}>
            {isUpdating === true ? (
                <>
                    <UpdateTaskStatusMessage updateMutation={updateMutation} />

                    <UpdateTaskForm
                        handleAction={handleAction}
                        createTaskData={createTaskData}
                        handleOnChange={handleOnChange}
                        handleOnUpdateChange={handleOnUpdateChange}
                        updateMutation={updateMutation}
                        handleReset={handleReset}
                    />
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
