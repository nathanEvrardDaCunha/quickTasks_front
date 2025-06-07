import Heading from '../../components/ui/Heading';
import Section from '../../components/ui/Section';
import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import Main from '../../layouts/Main';
import RegisterForm from './components/RegisterForm';
import RegisterStatusMessage from './components/RegisterStatusMessage';
import useRegister from './hooks/useRegister';

// Add Text in the Form for each input field

// Aria needed ?

export default function Register() {
    const {
        mutation,
        handleAction,
        handleOnChange,
        handleReset,
        userFormDate,
    } = useRegister();

    // The email id cause html autocomplete to work sub optimally

    // Need to fix every mutation and maybe query type overwrite problems
    return (
        <>
            <Header />

            <Main style={{ gap: 24, marginBlockStart: 32 }} variant={'fluid'}>
                <Section variant={'column'}>
                    <Heading variant={'h1'} markup={'h1'}>
                        Sign Up
                    </Heading>

                    <Heading variant={'h4'} markup={'h2'}>
                        So you can use our services.
                    </Heading>
                </Section>

                <Section variant={'column'} style={{ gap: 24 }}>
                    <RegisterStatusMessage mutation={mutation} />

                    <RegisterForm
                        handleAction={handleAction}
                        handleOnChange={handleOnChange}
                        handleReset={handleReset}
                        userFormDate={userFormDate}
                        mutation={mutation}
                    />
                </Section>
            </Main>

            <Footer />
        </>
    );
}
