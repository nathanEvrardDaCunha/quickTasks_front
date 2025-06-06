import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import UpdateProfileForm from './components/UpdateProfileForm';
import useUpdateProfile from './hooks/useUpdateProfile';
import UpdateProfileStatus from './components/UpdateProfileStatus';

// Maybe use AI rewrite every sentence in the project to be more professional (error ; success ; form label ; form description...)
// Maybe use AI rewrite every sentence in the back to be more professional (error ; success...)

export default function UserUpdateProfile() {
    const {
        handleReset,
        handleOnChange,
        handleAction,
        mutation,
        userFormData,
    } = useUpdateProfile();

    return (
        <>
            <Header />
            <main>
                <h1>User Update Profile</h1>

                <UpdateProfileStatus mutation={mutation} />

                <UpdateProfileForm
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
