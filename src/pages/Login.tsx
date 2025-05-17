function Login() {
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
                <h1>Login Page</h1>

                <form action={handleAction}>
                    <fieldset>
                        <legend>User Sign-In</legend>

                        <label htmlFor="sign-in-email">Email Address</label>
                        <input
                            type="email"
                            name="sign-in-email"
                            id="sign-in-email"
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

                        <label htmlFor="sign-in-password">Password</label>
                        <input
                            type="password"
                            name="sign-in-password"
                            id="sign-in-password"
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

export default Login;
