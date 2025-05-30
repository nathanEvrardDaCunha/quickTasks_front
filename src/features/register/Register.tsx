import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
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

    // Need to fix every mutation and maybe query type overwrite problems
    return (
        <>
            <Header />
            <main>
                <h1>Register Page</h1>

                <RegisterStatusMessage mutation={mutation} />

                <RegisterForm
                    handleAction={handleAction}
                    handleOnChange={handleOnChange}
                    handleReset={handleReset}
                    userFormDate={userFormDate}
                    mutation={mutation}
                />
            </main>
            <Footer />
        </>
    );
}
