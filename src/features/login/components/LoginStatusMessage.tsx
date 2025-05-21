import type { LoginError } from '../types/loginType';

export default function LoginStatusMessage({ mutation }) {
    if (mutation.isPending) {
        return <h2>Action processing...</h2>;
    }

    if (mutation.isSuccess && mutation.data) {
        return <h2>Success: {mutation.data.message}</h2>;
    }

    if (mutation.error) {
        return (
            <h2>
                Error:{' '}
                {(mutation.error as LoginError).cause || mutation.error.message}
            </h2>
        );
    }

    return null;
}
