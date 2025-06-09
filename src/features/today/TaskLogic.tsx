import {
    type QueryObserverResult,
    type RefetchOptions,
} from '@tanstack/react-query';

import useDeleteTask from './hooks/useDeleteTask';
import useCompleteTask from './hooks/useCompleteTask';
import useUpdateTask from './hooks/useUpdateTask';
import UpdateTaskForm from './components/UpdateTaskForm';
import UpdateTaskStatusMessage from './components/UpdateTaskStatusMessage';
import TaskBody from './components/TaskBody';
import type { FetchTask } from './types/typeFetchTask';
import Card from '../../components/ui/Card';

interface TaskLogicProps {
    task: FetchTask;
    query: QueryType;
}

type QueryType = {
    refetch: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult>;
};

export default function TaskLogic(props: TaskLogicProps) {
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

    return (
        <li key={props.task.id}>
            {isUpdating === true ? (
                <>
                    <Card variant={'outline'} style={{ gap: 24 }}>
                        <UpdateTaskStatusMessage
                            updateMutation={updateMutation}
                        />

                        <UpdateTaskForm
                            handleAction={handleAction}
                            createTaskData={createTaskData}
                            handleOnChange={handleOnChange}
                            handleOnUpdateChange={handleOnUpdateChange}
                            updateMutation={updateMutation}
                            handleReset={handleReset}
                        />
                    </Card>
                </>
            ) : (
                <TaskBody
                    handleOnUpdateChange={handleOnUpdateChange}
                    handleOnCompleteClick={handleOnCompleteClick}
                    handleOnDeleteClick={handleOnDeleteClick}
                    task={props.task}
                />
            )}
        </li>
    );
}
