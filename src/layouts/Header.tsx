import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { CreateTaskError } from '../features/today/types/typeCreateTask';
import { apiClient } from '../hooks/ApiClient';

export function Header() {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setAccessToken(localStorage.getItem('accessToken'));
    }, []);

    const mutation = useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            return await apiClient.logout();
        },
        onSuccess() {
            localStorage.removeItem('accessToken');
            navigate('/login');
        },
        onError(error: CreateTaskError) {
            console.error(`${error.name}: ${error.cause}`);
        },
    });

    function handleOnLogoutClick(): void {
        mutation.mutate();
    }

    return (
        <header>
            <h2>Website Header</h2>
            {accessToken === null ? (
                <section>
                    <Link to={'/register'}>
                        <button type="button">Register</button>
                    </Link>

                    <Link to={'/login'}>
                        <button type="button">Login</button>
                    </Link>
                </section>
            ) : (
                <button type="button" onClick={handleOnLogoutClick}>
                    Logout
                </button>
            )}
        </header>
    );
}
