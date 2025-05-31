import {
    useMutation,
    type QueryObserverResult,
    type RefetchOptions,
} from '@tanstack/react-query';
import { apiClient } from '../../../hooks/ApiClient';
import type {
    CompleteTaskError,
    CompleteTaskSuccess,
} from '../types/typeCompleteTask';

type QueryType = {
    refetch: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult>;
};

export default function useCompleteTask(taskId: number, query: QueryType) {
    const completeMutation = useMutation({
        mutationKey: ['completeSingleTask'],
        mutationFn: async (taskId: number) => {
            return (await apiClient.completeSingleTask({
                id: taskId,
            })) as CompleteTaskSuccess;
        },
        onSuccess() {
            query.refetch();
        },
        onError(error: CompleteTaskError) {
            console.error(`${error.name}: ${error.cause}`);
        },
    });

    function handleOnCompleteClick(): void {
        completeMutation.mutate(taskId);
    }

    return { handleOnCompleteClick };
}
