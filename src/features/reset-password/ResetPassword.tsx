import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import Main from '../../layouts/Main';
import ResetPasswordForm from './components/ResetPasswordForm';
import ResetPasswordMessage from './components/ResetPasswordMessage';
import useResetPassword from './hooks/useResetPassword';

// Add Text in the Form for each input field

// Add Text Between the Heading and the Form to describe what is this form about

// Make the "Reset Password" Link shine as an interactive component

// Transform the Form

// Use AI to rewrite every text to be more professional

// - Add a placeholder if possible

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

            <Main>
                <h1>Reset Password Page</h1>

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
