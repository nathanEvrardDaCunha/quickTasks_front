export default function LoginForm({
    handleAction,
    handleOnChange,
    handleReset,
    mutation,
    userFormData,
}) {
    return (
        <>
            <form action={handleAction}>
                <fieldset>
                    <legend>User Sign-In</legend>

                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required={true}
                        value={userFormData.email}
                        onChange={handleOnChange}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required={true}
                        value={userFormData.password}
                        onChange={handleOnChange}
                    />

                    <button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Submitting...' : 'Submit'}
                    </button>
                    <button type="button" onClick={handleReset}>
                        Reset
                    </button>
                </fieldset>
            </form>
        </>
    );
}
