import type { UseMutationResult } from '@tanstack/react-query';
import type { CreateTask } from '../types/typeCreateTask';
import type {
    UpdateTaskSuccess,
    UpdateTaskError,
} from '../types/typeUpdateTask';
import Status from '../../../components/composed/Status';

interface UpdateTaskStatusMessageProps {
    updateMutation: UseMutationResult<
        UpdateTaskSuccess,
        UpdateTaskError,
        Omit<CreateTask, 'accessToken'>,
        unknown
    >;
}

export default function UpdateTaskStatusMessage(
    props: UpdateTaskStatusMessageProps
) {
    if (props.updateMutation.isPending) {
        return <Status variant={'pending'}>Loading update tasks...</Status>;
    }

    if (props.updateMutation.isError) {
        return (
            <Status variant={'error'}>
                {props.updateMutation.error.cause || 'Failed to update task'}
            </Status>
        );
    }

    if (props.updateMutation.isSuccess) {
        return <Status variant={'success'}>Update task successfully</Status>;
    }

    return null;
}
