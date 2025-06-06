import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';

import { Link } from 'react-router-dom';
import FetchUser from './components/FetchUser';
import useFetchUser from './hooks/useFetchUser';

export default function UserDashboard() {
    const { query } = useFetchUser();
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

                    <button>Update Personal Information</button>

                    <Link to={'/user-change-password'}>
                        <button>Change Password</button>
                    </Link>

                    <button>Delete Account</button>
                </section>
            </main>
            <Footer />
        </>
    );
}
