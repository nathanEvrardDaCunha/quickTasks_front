function Register() {
    // TO-CONSIDER: Is it necessary to add constraint to input when the server is already doing this job for us ?

    function handleAction(formData: FormData) {
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
    }

    return (
        <>
            <header>
                <h2>Website Header</h2>
            </header>
            <main>
                <h1>Register Page</h1>

                <form action={handleAction}>
                    <fieldset>
                        <legend>User Sign-Up</legend>

                        <label htmlFor="sign-up-username">Username</label>
                        <input
                            type="text"
                            name="sign-up-button"
                            id="sign-up-button"
                            required={true}
                        />

                        {/* <input
                            type="text"
                            name="sign-up-button"
                            id="sign-up-button"
                            required={true}
                            value={undefined}
                            onChange={undefined}
                            minLength={undefined}
                            maxLength={undefined}
                            spellCheck={false}
                            disabled={false}
                            placeholder=""
                            pattern={undefined}
                        /> */}

                        <label htmlFor="sign-up-email">Email Address</label>
                        <input
                            type="email"
                            name="sign-up-email"
                            id="sign-up-email"
                            required={true}
                        />

                        {/* <input
                            type="email"
                            name="sign-up-email"
                            id="sign-up-email"
                            required={true}
                            value={undefined}
                            onChange={undefined}
                            minLength={undefined}
                            maxLength={undefined}
                            disabled={false}
                            placeholder=""
                            pattern={undefined}
                        /> */}

                        <label htmlFor="sign-up-password">Password</label>
                        <input
                            type="password"
                            name="sign-up-password"
                            id="sign-up-password"
                            required={true}
                        />

                        {/* <input
                            type="password"
                            name="sign-up-password"
                            id="sign-up-password"
                            required={true}
                            value={undefined}
                            onChange={undefined}
                            minLength={undefined}
                            maxLength={undefined}
                            disabled={false}
                            placeholder=""
                            pattern={undefined}
                        /> */}

                        <button type="submit">Submit</button>
                        <button type="reset">Reset</button>
                    </fieldset>
                </form>
            </main>
            <footer>
                <h2>Website Footer</h2>
            </footer>
        </>
    );
}

export default Register;
