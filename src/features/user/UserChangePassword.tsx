import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import ChangePasswordForm from './components/ChangePasswordForm';
import useChangePassword from './hooks/useChangePassword';
import ChangePasswordStatus from './components/ChangePasswordStatus';

// For each form:
// - Add a placeholder if possible
// - Add a <p> description for each field if possible

export default function UserChangePassword() {
    const { handleAction, handleOnChange, mutation, userFormData } =
        useChangePassword();

    return (
        <>
            <Header />
            <main>
                <h1>User Change Password</h1>

                <ChangePasswordStatus mutation={mutation} />

                <ChangePasswordForm
                    handleAction={handleAction}
                    userFormData={userFormData}
                    handleOnChange={handleOnChange}
                    mutation={mutation}
                />
            </main>
            <Footer />
        </>
    );
}
