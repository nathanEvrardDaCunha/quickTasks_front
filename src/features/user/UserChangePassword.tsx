import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import ChangePasswordForm from './components/ChangePasswordForm';
import useChangePassword from './hooks/useChangePassword';
import ChangePasswordStatus from './components/ChangePasswordStatus';
import Main from '../../layouts/Main';

// For each form:
// - Add a placeholder if possible
// - Add a <p> description for each field if possible

// Add Text in the Form for each input field

// Add Text Between the Heading and the Form to describe what is this form about

// Transform the Form

// Use AI to rewrite every text to be more professional

// - Add a placeholder if possible

export default function UserChangePassword() {
    const {
        handleReset,
        handleAction,
        handleOnChange,
        mutation,
        userFormData,
    } = useChangePassword();

    return (
        <>
            <Header />

            <Main>
                <h1>User Change Password</h1>

                <ChangePasswordStatus mutation={mutation} />

                <ChangePasswordForm
                    handleAction={handleAction}
                    userFormData={userFormData}
                    handleOnChange={handleOnChange}
                    mutation={mutation}
                    handleReset={handleReset}
                />
            </Main>

            <Footer />
        </>
    );
}
