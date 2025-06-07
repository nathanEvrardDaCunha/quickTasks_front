import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';

import { Link } from 'react-router-dom';
import FetchUser from './components/FetchUser';
import useFetchUser from './hooks/useFetchUser';
import useDeleteAccount from './hooks/useDeleteAccount';
import Main from '../../layouts/Main';

// Add Text Between the Heading and the Page to describe what is this form about

// Transform the Page

// Use AI to rewrite every text to be more professional

export default function UserDashboard() {
    const { query } = useFetchUser();
    const { handleOnDeleteClick } = useDeleteAccount();

    // When account delete => automatically go to homepage and logout

    return (
        <>
            <Header />

            <Main>
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
            </Main>

            <Footer />
        </>
    );
}
