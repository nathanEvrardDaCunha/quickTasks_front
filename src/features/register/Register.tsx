import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import Main from '../../layouts/Main';
import RegisterForm from './components/RegisterForm';
import RegisterStatusMessage from './components/RegisterStatusMessage';
import useRegister from './hooks/useRegister';

// Add Text in the Form for each input field

// Add Text Between the Heading and the Form to describe what is this form about

// Make the "Reset Password" Link shine as an interactive component

// Transform the Form

// Use AI to rewrite every text to be more professional

// - Add a placeholder if possible

export default function Register() {
    const {
        mutation,
        handleAction,
        handleOnChange,
        handleReset,
        userFormDate,
    } = useRegister();

    // Need to fix every mutation and maybe query type overwrite problems
    return (
        <>
            <Header />

            <Main>
                <h1>Register Page</h1>

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
