import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';

import { Link, useNavigate } from 'react-router-dom';
import FetchUser from './components/FetchUser';
import useFetchUser from './hooks/useFetchUser';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../hooks/ApiClient';
import type {
    DeleteAccountError,
    DeleteAccountSuccess,
} from './types/typeDeleteAccount';

export default function UserDashboard() {
    const { query } = useFetchUser();
    const navigate = useNavigate();

    // Check if refreshToken in cookie and accessToken in localStorage are removed

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

    // When account delete => automatically go to homepage and logout

    return (
        <>
            <Header />
            <main>
                <h1>User Dashboard</h1>

                <FetchUser query={query} />

                <section>
                    <h2>Available Action</h2>

                    <Link to={'/today'}>
                        <button>Check Task</button>
                    </Link>

                    <Link to={'/user-update-profile'}>
                        <button>Update Profile</button>
                    </Link>

                    <Link to={'/user-change-password'}>
                        <button>Change Password</button>
                    </Link>
                </section>

                <section>
                    <h2>Permanent Action</h2>

                    <button onClick={handleOnDeleteClick}>
                        Delete Account
                    </button>
                </section>
            </main>
            <Footer />
        </>
    );
}
