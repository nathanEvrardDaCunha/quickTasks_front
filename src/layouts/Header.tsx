import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { CreateTaskError } from '../features/today/types/typeCreateTask';
import { apiClient } from '../hooks/ApiClient';
import './header.scss';
import Button from '../components/ui/Button';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

import brandLogo192 from '../assets/favicon_io/android-chrome-192x192.png';

export function Header() {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();

    useEffect(() => {
        setAccessToken(localStorage.getItem('accessToken'));
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
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
            <div className="header__left">
                <Link to={'/'}>
                    <img
                        src={brandLogo192}
                        alt="QuickTasks Business Icon"
                        className="header__icon"
                        tabIndex={0}
                    />
                </Link>
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={
                        isDarkMode
                            ? 'Switch to light mode'
                            : 'Switch to dark mode'
                    }
                >
                    {isDarkMode ? (
                        <FiSun className="theme-icon" />
                    ) : (
                        <FiMoon className="theme-icon" />
                    )}
                </button>
            </div>

            <button
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
            >
                {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            <nav
                className={`header__navigation ${
                    isMobileMenuOpen ? 'is-open' : ''
                }`}
            >
                {accessToken === null ? (
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
                ) : (
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
                )}
            </nav>
        </header>
    );
}
