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
            <header>
                <h2>Website Header</h2>
            </header>

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
            <footer>
                <h2>Website Footer</h2>
            </footer>
        </>
    );
}

export default Login;
