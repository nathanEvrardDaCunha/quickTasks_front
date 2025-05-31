import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import type { FetchTaskSuccess } from '../types/typeFetchTask';
import { apiClient } from '../../../hooks/ApiClient';

export default function useFetchTask() {
    const [accessToken, setAccessToken] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setAccessToken(token);
        }
    }, []);

    const query = useQuery({
        queryKey: ['getTodayTask', accessToken],
        queryFn: async () => {
            return (await apiClient.fetchTodayTasks()) as FetchTaskSuccess;
        },
        enabled: Boolean(accessToken),
        refetchInterval: 5 * 60000,
    });

    return { query };
}
