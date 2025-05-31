import {
    useMutation,
    type QueryObserverResult,
    type RefetchOptions,
} from '@tanstack/react-query';
import { apiClient } from '../../../hooks/ApiClient';
import type {
    DeleteTaskError,
    DeleteTaskSuccess,
} from '../types/typeDeleteTask';

type QueryType = {
    refetch: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult>;
};

export default function useDeleteTask(taskId: number, query: QueryType) {
    const deleteMutation = useMutation({
        mutationKey: ['deleteSingleTask'],
        mutationFn: async (taskId: number) => {
            return (await apiClient.deleteSingleTask({
                id: taskId,
            })) as DeleteTaskSuccess;
        },
        onSuccess() {
            query.refetch();
        },
        onError(error: DeleteTaskError) {
            console.error(`${error.name}: ${error.cause}`);
        },
    });

    function handleOnDeleteClick(): void {
        deleteMutation.mutate(taskId);
    }

    return { handleOnDeleteClick };
}
