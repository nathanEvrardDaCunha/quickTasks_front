import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

type User = {
    email: string;
    password: string;
};

type APIError = {
    name: string;
    cause: string;
    stack: string;
};

// Should remove the status from here and the server.
type APISuccess = {
    status: string;
    message: string;
    accessToken: string;
};

// Might be a good idea to create my custom Error with more detail ?

function Login() {
    const [formData, setFormData] = useState<User>({
        email: '',
        password: '',
    });

    // Form what I remember, the server side doesn't have a default route for non implemented api route (like GET for api/auth/login which will never exist)

    // Should remove "Cannot process weak password ! It should have one uppercase, lowercase, number, special character, and be at least 6 characters long."
    // in server with "Invalid credentials" instead

    const mutation = useMutation({
        mutationKey: ['loginUser'],
        mutationFn: async (user: User) => {
            const result = await fetch(`http://localhost:5003/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!result.ok) {
                const errorData: APIError = await result.json();
                throw errorData;
            }

            return await result.json();
        },
        onError: (error: APIError) => {
            console.error(`${error.name}: ${error.cause}`);
        },
        onSuccess: (data: APISuccess) => {
            localStorage.setItem('accessToken', data.accessToken);
            handleReset();
        },
    });

    function handleAction(formData: FormData) {
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email) {
            throw new Error(`Couldn't find the email property of the form !`);
        }

        if (!password) {
            throw new Error(
                `Couldn't find the password property of the form !`
            );
        }

        const user: User = {
            email: email as string,
            password: password as string,
        };

        mutation.mutate(user);
    }

    function handleOnCHange(event: any) {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleReset() {
        setFormData({
            email: '',
            password: '',
        });
    }

    return (
        <>
            <header>
                <h2>Website Header</h2>
            </header>

            <main>
                <h1>Login Page</h1>

                {mutation.isSuccess && (
                    <h2>Success: {(mutation.data as APISuccess).message}</h2>
                )}

                {mutation.error && (
                    <h2>Error: {(mutation.error as APIError).cause} </h2>
                )}

                {mutation.isPending && <h2>Action processing...</h2>}

                <form action={handleAction}>
                    <fieldset>
                        <legend>User Sign-In</legend>

                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required={true}
                            value={formData.email}
                            onChange={handleOnCHange}
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required={true}
                            value={formData.password}
                            onChange={handleOnCHange}
                        />

                        <button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Submitting...' : 'Submit'}
                        </button>
                        <button type="button" onClick={handleReset}>
                            Reset
                        </button>
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
