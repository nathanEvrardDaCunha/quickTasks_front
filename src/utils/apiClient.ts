export class ApiClient {
    private static refreshPromise: Promise<string> | null = null;

    static async makeAuthenticatedRequest(
        url: string,
        options: RequestInit = {}
    ): Promise<Response> {
        const makeRequest = async (token: string) => {
            return fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                    Authorization: token,
                },
            });
        };

        // Get current token
        let accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            accessToken = await this.refreshAccessToken();
        }

        // Try the request
        let response = await makeRequest(accessToken);

        // If token is invalid, try to refresh once
        if (response.status === 401 || response.status === 403) {
            try {
                accessToken = await this.refreshAccessToken();
                response = await makeRequest(accessToken);
            } catch (refreshError) {
                // Refresh failed, redirect to login or handle accordingly
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userId');
                throw new Error('Authentication failed. Please log in again.');
            }
        }

        return response;
    }

    private static async refreshAccessToken(): Promise<string> {
        // Prevent multiple simultaneous refresh attempts
        if (this.refreshPromise) {
            return await this.refreshPromise;
        }

        this.refreshPromise = this.performTokenRefresh();

        try {
            const token = await this.refreshPromise;
            return token;
        } finally {
            this.refreshPromise = null;
        }
    }

    private static async performTokenRefresh(): Promise<string> {
        const response = await fetch(`http://localhost:5003/api/token/token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies for refresh token
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Token refresh failed');
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);

        return data.accessToken;
    }
}
