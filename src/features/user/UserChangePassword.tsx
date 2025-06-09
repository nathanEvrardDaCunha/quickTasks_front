import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import ChangePasswordForm from './components/ChangePasswordForm';
import useChangePassword from './hooks/useChangePassword';
import ChangePasswordStatus from './components/ChangePasswordStatus';
import Main from '../../layouts/Main';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';

export default function UserChangePassword() {
    const {
        handleReset,
        handleAction,
        handleOnChange,
        mutation,
        userFormData,
    } = useChangePassword();

    return (
        <>
            <Header />

            <Main style={{ gap: 24 }} variant={'fluid'}>
                <Section variant={'column'}>
                    <Heading variant={'h1'} markup={'h1'}>
                        Change Password
                    </Heading>

                    <Heading variant={'h4'} markup={'h2'}>
                        So you can remember it.
                    </Heading>
                </Section>

                <ChangePasswordStatus mutation={mutation} />

                <ChangePasswordForm
                    handleAction={handleAction}
                    userFormData={userFormData}
                    handleOnChange={handleOnChange}
                    mutation={mutation}
                    handleReset={handleReset}
                />
            </Main>

            <Footer />
        </>
    );
}
