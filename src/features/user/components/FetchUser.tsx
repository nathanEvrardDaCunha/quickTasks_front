import type { UseQueryResult } from '@tanstack/react-query';
import type { JSX } from 'react';
import type { FetchUserSuccess } from '../types/typeFetchUser';

interface FetchUserProps {
    query: UseQueryResult<FetchUserSuccess, Error>;
}

export default function FetchUser({
    query,
}: FetchUserProps): JSX.Element | null {
    if (query.isLoading) {
        return <p>Loading user...</p>;
    }

    if (query.isError) {
        return <h2>Error: {query.error.message || 'Failed to fetch user'} </h2>;
    }

    if (query.isSuccess && query.data) {
        return (
            <section>
                <h2>Personal Information</h2>

                <p>
                    <strong>Username:</strong> {query.data.data.username}
                </p>
                <p>
                    <strong>Email:</strong> {query.data.data.email}
                </p>
                <p>
                    <strong>Password:</strong> ***********
                </p>
            </section>
        );
    }

    if (!query.isLoading && !query.isError) {
        return <p>No user found !</p>;
    }

    return null;
}
