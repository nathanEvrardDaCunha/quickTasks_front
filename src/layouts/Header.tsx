import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { CreateTaskError } from '../features/today/types/typeCreateTask';
import { apiClient } from '../hooks/ApiClient';
import './header.scss';
import Button from '../components/ui/Button';

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
        <header className="container__header">
            <Link to={'/'}>
                <img
                    src="/src/assets/favicon_io/android-chrome-192x192.png"
                    srcSet="/src/assets/favicon_io/android-chrome-192x192.png, /src/assets/favicon_io/android-chrome-512x512.png 2x"
                    alt="QuickTask Business Icon"
                    className="header__icon"
                />
            </Link>

            {accessToken === null ? (
                <nav className="header__navigation">
                    <ul className="navigation__list">
                        <li>
                            <Link to={'/login'}>
                                <Button type={'button'} variant={'outline'}>
                                    Sign In
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/register'}>
                                <Button type={'button'} variant={'default'}>
                                    Sign Up
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav className="header__navigation">
                    <ul className="navigation__list">
                        <li>
                            <Button
                                type={'button'}
                                variant={'outline'}
                                handleOnClick={handleOnLogoutClick}
                            >
                                Sign Out
                            </Button>
                        </li>
                        <li>
                            <Link to={'/user'}>
                                <Button type={'button'} variant={'default'}>
                                    Account
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
