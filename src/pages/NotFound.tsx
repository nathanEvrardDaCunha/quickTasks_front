import { Link } from 'react-router-dom';
import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';
import Main from '../layouts/Main';
import Button from '../components/ui/Button';

// Add text between Heading and Button

export function NotFound() {
    return (
        <>
            <Header />

            <Main variant={'default'}>
                <h1>Not Found</h1>
                <Link to={'/'}>
                    <Button type="button" variant={'default'}>
                        Go back to home page
                    </Button>
                </Link>
            </Main>

            <Footer />
        </>
    );
}
