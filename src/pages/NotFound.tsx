import { Link } from 'react-router-dom';
import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';
import Main from '../layouts/Main';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import Section from '../components/ui/Section';

// Add text between Heading and Button

export function NotFound() {
    return (
        <>
            <Header />

            <Main style={{ gap: 24 }} variant={'fluid'}>
                <Section variant={'column'}>
                    <Heading variant={'h1'} markup={'h1'}>
                        Not Found
                    </Heading>

                    <Heading variant={'h4'} markup={'h2'}>
                        We're sorry but this page doesn't exist.
                    </Heading>
                    <Heading variant={'h4'} markup={'h2'}>
                        Click on the button below to go back to the home page.
                    </Heading>
                </Section>

                <Link to={'/'}>
                    <Button type="button" variant={'default'}>
                        Go Back
                    </Button>
                </Link>
            </Main>

            <Footer />
        </>
    );
}
