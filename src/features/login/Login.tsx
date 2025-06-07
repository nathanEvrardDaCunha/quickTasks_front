import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import Main from '../../layouts/Main';
import LoginForm from './components/LoginForm';
import LoginStatusMessage from './components/LoginStatusMessage';
import useLogin from './hooks/useLogin';

// Add Text in the Form for each input field

// Add Text Between the Heading and the Form to describe what is this form about

// Make the "Reset Password" Link shine as an interactive component

// Transform the Form

// Use AI to rewrite every text to be more professional

// - Add a placeholder if possible

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

            <Main>
                <h1>Login Page</h1>

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
