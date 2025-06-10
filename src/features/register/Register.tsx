import Heading from '../../components/ui/Heading';
import Section from '../../components/ui/Section';
import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import Main from '../../layouts/Main';
import RegisterForm from './components/RegisterForm';
import RegisterStatusMessage from './components/RegisterStatusMessage';
import useRegister from './hooks/useRegister';

export default function Register() {
    const {
        mutation,
        handleAction,
        handleOnChange,
        handleReset,
        userFormDate,
    } = useRegister();

    return (
        <>
            <Header />

            <Main style={{ gap: 24 }} variant={'fluid'}>
                <Section variant={'column'}>
                    <Heading variant={'h1'} markup={'h1'}>
                        Sign Up
                    </Heading>

                    <Heading variant={'h4'} markup={'h2'}>
                        So you can use our services.
                    </Heading>
                </Section>

                <RegisterStatusMessage mutation={mutation} />

                <RegisterForm
                    handleAction={handleAction}
                    handleOnChange={handleOnChange}
                    handleReset={handleReset}
                    userFormDate={userFormDate}
                    mutation={mutation}
                />
            </Main>

            <Footer />
        </>
    );
}
