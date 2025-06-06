import { useEffect, useState, type JSX } from 'react';
import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../hooks/ApiClient';
import type { FetchUserSuccess } from './types/typeFetchUser';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
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

    function displayUserInformation(): JSX.Element | null {
        if (query.isLoading) {
            return <p>Loading user...</p>;
        }

        if (query.isError) {
            return (
                <h2>Error: {query.error.message || 'Failed to fetch user'} </h2>
            );
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

    return (
        <>
            <Header />
            <main>
                <h1>User Dashboard</h1>

                {displayUserInformation()}

                <section>
                    <h2>Available Action</h2>

                    <Link to={'/today'}>
                        <button>Check Task</button>
                    </Link>
                    <button>Update Personal Information</button>
                    <button>Change Password</button>
                    <button>Delete Account</button>
                </section>
            </main>
            <Footer />
        </>
    );
}
