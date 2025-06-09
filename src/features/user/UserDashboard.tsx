import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';

import { Link } from 'react-router-dom';
import FetchUser from './components/FetchUser';
import useFetchUser from './hooks/useFetchUser';
import useDeleteAccount from './hooks/useDeleteAccount';
import Main from '../../layouts/Main';
import Heading from '../../components/ui/Heading';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';

export default function UserDashboard() {
    const { query } = useFetchUser();
    const { handleOnDeleteClick } = useDeleteAccount();

    return (
        <>
            <Header />

            <Main style={{ gap: 24 }} variant={'fluid'}>
                <Section variant={'column'}>
                    <Heading variant={'h1'} markup={'h1'}>
                        Dashboard
                    </Heading>

                    <Heading variant={'h4'} markup={'h2'}>
                        The page where you can interact with our services.
                    </Heading>
                </Section>

                <FetchUser query={query} />

                <Section variant={'column'}>
                    <Section variant={'column'} style={{ marginBlockEnd: 4 }}>
                        <Heading variant={'h3'} markup={'h3'}>
                            Account
                        </Heading>

                        <Heading variant={'p'} markup={'h4'}>
                            Regroup our functionalities.
                        </Heading>
                    </Section>

                    <Section
                        variant={'row'}
                        style={{ justifyContent: 'space-between' }}
                    >
                        <Link to={'/today'}>
                            <Button type={'button'} variant={'default'}>
                                Check Task
                            </Button>
                        </Link>

                        <Link to={'/user-update-profile'}>
                            <Button type={'button'} variant={'default'}>
                                Update Profile
                            </Button>
                        </Link>

                        <Link to={'/user-change-password'}>
                            <Button type={'button'} variant={'outline'}>
                                Change Password
                            </Button>
                        </Link>
                    </Section>
                </Section>

                <Section variant={'column'}>
                    <Section variant={'column'} style={{ marginBlockEnd: 4 }}>
                        <Heading variant={'h3'} markup={'h3'}>
                            Danger
                        </Heading>

                        <Heading variant={'p'} markup={'h4'}>
                            Regroup permanent actions.
                        </Heading>
                    </Section>

                    <Button
                        type={'button'}
                        variant={'outline'}
                        handleOnClick={handleOnDeleteClick}
                    >
                        Delete Account
                    </Button>
                </Section>
            </Main>

            <Footer />
        </>
    );
}
