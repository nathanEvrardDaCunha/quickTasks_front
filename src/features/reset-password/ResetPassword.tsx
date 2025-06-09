import Heading from '../../components/ui/Heading';
import Section from '../../components/ui/Section';
import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import Main from '../../layouts/Main';
import ResetPasswordForm from './components/ResetPasswordForm';
import ResetPasswordMessage from './components/ResetPasswordMessage';
import useResetPassword from './hooks/useResetPassword';

export default function ResetPassword() {
    const {
        handleReset,
        handleOnChange,
        handleAction,
        mutation,
        userFormData,
    } = useResetPassword();

    return (
        <>
            <Header />

            <Main style={{ gap: 24 }} variant={'fluid'}>
                <Section variant={'column'}>
                    <Heading variant={'h1'} markup={'h1'}>
                        Reset Password
                    </Heading>

                    <Heading variant={'h4'} markup={'h2'}>
                        So you can still connect.
                    </Heading>
                </Section>

                <ResetPasswordMessage mutation={mutation} />

                <ResetPasswordForm
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
