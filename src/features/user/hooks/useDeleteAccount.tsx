import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../hooks/ApiClient';
import type {
    DeleteAccountSuccess,
    DeleteAccountError,
} from '../types/typeDeleteAccount';

export default function useDeleteAccount() {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['deleteAccount'],
        mutationFn: async () => {
            return (await apiClient.deleteAccount()) as DeleteAccountSuccess;
        },
        onSuccess() {
            localStorage.removeItem('accessToken');
            navigate('/login');
        },
        onError(error: DeleteAccountError) {
            console.error(`${error.name}: ${error.cause}`);
        },
    });

    function handleOnDeleteClick() {
        mutation.mutate();
    }

    return { handleOnDeleteClick };
}
