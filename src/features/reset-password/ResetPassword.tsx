import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
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

            <main>
                <h1>Reset Password Page</h1>

                <ResetPasswordMessage mutation={mutation} />

                <ResetPasswordForm
                    handleAction={handleAction}
                    handleOnChange={handleOnChange}
                    handleReset={handleReset}
                    mutation={mutation}
                    userFormData={userFormData}
                />
            </main>

            <Footer />
        </>
    );
}
