import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
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
            <main>
                <h1>Login Page</h1>

                <LoginStatusMessage mutation={mutation} />

                <LoginForm
                    handleAction={handleAction}
                    handleOnChange={handleOnCHange}
                    handleReset={handleReset}
                    mutation={mutation}
                    userFormData={userFormData}
                />
            </main>
            <Footer />
        </>
    );
}

export default Login;
