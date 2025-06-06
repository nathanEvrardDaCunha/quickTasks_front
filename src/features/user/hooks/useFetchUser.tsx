import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { apiClient } from '../../../hooks/ApiClient';
import type { FetchUserSuccess } from '../types/typeFetchUser';

export default function useFetchUser() {
    const [accessToken, setAccessToken] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setAccessToken(token);
        }
    }, []);

    const query = useQuery({
        queryKey: ['getUser', accessToken],
        queryFn: async () => {
            return (await apiClient.fetchUser()) as FetchUserSuccess;
        },
        enabled: Boolean(accessToken),
        refetchInterval: 5 * 60000,
    });

    return { query };
}
