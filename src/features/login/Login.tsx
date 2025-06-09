import Heading from '../../components/ui/Heading';
import Section from '../../components/ui/Section';
import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import Main from '../../layouts/Main';
import LoginForm from './components/LoginForm';
import LoginStatusMessage from './components/LoginStatusMessage';
import useLogin from './hooks/useLogin';

function Login() {
    const {
        handleAction,
        handleOnCHange,
        handleReset,
        mutation,
        userFormData,
    } = useLogin();

    return (
        <>
            <Header />

            <Main style={{ gap: 24 }} variant={'fluid'}>
                <Section variant={'column'}>
                    <Heading variant={'h1'} markup={'h1'}>
                        Sign In
                    </Heading>

                    <Heading variant={'h4'} markup={'h2'}>
                        So you can use our services.
                    </Heading>
                </Section>

                <LoginStatusMessage mutation={mutation} />

                <LoginForm
                    handleAction={handleAction}
                    handleOnChange={handleOnCHange}
                    handleReset={handleReset}
                    mutation={mutation}
                    userFormData={userFormData}
                />
            </Main>

            <Footer />
        </>
    );
}

export default Login;
