import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import UpdateProfileForm from './components/UpdateProfileForm';
import useUpdateProfile from './hooks/useUpdateProfile';
import UpdateProfileStatus from './components/UpdateProfileStatus';
import Main from '../../layouts/Main';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';

export default function UserUpdateProfile() {
    const {
        handleReset,
        handleOnChange,
        handleAction,
        mutation,
        userFormData,
    } = useUpdateProfile();

    return (
        <>
            <Header />

            <Main style={{ gap: 24 }} variant={'fluid'}>
                <Section variant={'column'}>
                    <Heading variant={'h1'} markup={'h1'}>
                        Update Account
                    </Heading>

                    <Heading variant={'h4'} markup={'h2'}>
                        So you can be up-to-date.
                    </Heading>
                </Section>

                <UpdateProfileStatus mutation={mutation} />

                <UpdateProfileForm
                    handleAction={handleAction}
                    handleOnChange={handleOnChange}
                    handleReset={handleReset}
                    mutation={mutation}
                    userFormData={userFormData}
                />
            </Main>

            <Footer />
        </>
    );
}
