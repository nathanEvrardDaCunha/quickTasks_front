import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

// Send it into a dedicated type file ?
type User = {
    username: string;
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
};

function Register() {
    const [formData, setFormData] = useState<User>({
        username: '',
        email: '',
        password: '',
    });

    // Hook ('useSomething' don't trigger at every rerunder it seem)
    // What about normal function ? Create one and see for yourself !

    const mutation = useMutation({
        mutationKey: ['registerUser'],
        mutationFn: async (user: User) => {
            const result = await fetch(
                `http://localhost:5003/api/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                }
            );

            // Is this part really mandatory ?
            // When I delete it, the onError seem to doesn't work, but I'm not sure if it's really mandatory.
            if (!result.ok) {
                const errorData: APIError = await result.json();
                throw errorData;
            }

            return await result.json();
        },
        onError: (error: APIError) => {
            console.error(`${error.name}: ${error.cause}`);
        },
        onSuccess: () => {
            handleReset();
        },
    });

    function handleAction(formData: FormData) {
        // DESIGN: The client is responsible for sending every field while the server is
        // responsible for validating the content of them and sending error if necessary
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        if (!username) {
            throw new Error(
                `Couldn't find the username property of the form !`
            );
        }

        if (!email) {
            throw new Error(`Couldn't find the email property of the form !`);
        }

        if (!password) {
            throw new Error(
                `Couldn't find the password property of the form !`
            );
        }

        const user: User = {
            username: username as string,
            email: email as string,
            password: password as string,
        };

        mutation.mutate(user);
    }

    function handleOnChange(event: any) {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleReset() {
        setFormData({
            username: '',
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
                <h1>Register Page</h1>

                {mutation.isSuccess && (
                    <h2>Success: {(mutation.data as APISuccess).message}</h2>
                )}

                {mutation.error && (
                    <h2>Error: {(mutation.error as APIError).cause} </h2>
                )}

                {mutation.isPending && <h2>Action processing...</h2>}

                <form action={handleAction}>
                    <fieldset>
                        <legend>User Sign-Up</legend>

                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleOnChange}
                            required
                        />

                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleOnChange}
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleOnChange}
                            required
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

export default Register;
