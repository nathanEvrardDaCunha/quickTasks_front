import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

export default function useAuthToken() {
    const queryClient = useQueryClient();
    const refreshPromiseRef = useRef<Promise<string> | null>(null);

    const refreshTokenQuery = useQuery({
        queryKey: ['refreshAccessToken'],
        queryFn: async () => {
            const result = await fetch(
                `http://localhost:5003/api/token/token`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // This includes cookies!
                }
            );

            if (!result.ok) {
                const errorData = await result.json();
                // Clear stored tokens on refresh failure
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userId');
                throw new Error(errorData.message || 'Token refresh failed');
            }

            const data = await result.json();

            // Store the new access token
            localStorage.setItem('accessToken', data.accessToken);

            return data.accessToken;
        },
        enabled: false, // Don't auto-run on mount
        retry: 1, // Only retry once
        staleTime: 0, // Always consider stale
    });

    // Function to get a valid access token, refreshing if needed
    const getValidAccessToken = async (): Promise<string> => {
        const currentToken = localStorage.getItem('accessToken');

        if (currentToken) {
            // Try to use current token first
            return currentToken;
        }

        // If we're already refreshing, wait for that promise
        if (refreshPromiseRef.current) {
            return await refreshPromiseRef.current;
        }

        // Start refresh process
        refreshPromiseRef.current = refreshTokenQuery
            .refetch()
            .then((result) => {
                refreshPromiseRef.current = null; // Clear the promise
                if (result.data) {
                    return result.data;
                }
                throw new Error('Failed to refresh token');
            });

        return await refreshPromiseRef.current;
    };

    return {
        getValidAccessToken,
        refreshTokenQuery,
        isRefreshing: refreshTokenQuery.isFetching,
    };
}
