import { Link } from 'react-router-dom';
import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';

export function NotFound() {
    return (
        <>
            <Header />

            <main>
                <h1>Not Found</h1>
                <Link to={'/'}>
                    <button type="button">Go back to home page</button>
                </Link>
            </main>

            <Footer />
        </>
    );
}
