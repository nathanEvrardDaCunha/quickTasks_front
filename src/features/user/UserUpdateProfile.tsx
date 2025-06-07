import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import UpdateProfileForm from './components/UpdateProfileForm';
import useUpdateProfile from './hooks/useUpdateProfile';
import UpdateProfileStatus from './components/UpdateProfileStatus';
import Main from '../../layouts/Main';

// Maybe use AI rewrite every sentence in the project to be more professional (error ; success ; form label ; form description...)
// Maybe use AI rewrite every sentence in the back to be more professional (error ; success...)

// Add Text in the Form for each input field

// Add Text Between the Heading and the Form to describe what is this form about

// Transform the Form

// Use AI to rewrite every text to be more professional

// - Add a placeholder if possible

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

            <Main>
                <h1>User Update Profile</h1>

                <UpdateProfileStatus mutation={mutation} />

                <UpdateProfileForm
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
