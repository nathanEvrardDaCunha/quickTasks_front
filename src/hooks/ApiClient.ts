// Simpler approach using Authorization header instead of query params
class ApiClient {
    private baseURL: string;
    private isRefreshing: boolean = false;
    private failedQueue: Array<{
        resolve: (value: any) => void;
        reject: (error: any) => void;
        retry: () => Promise<any>;
    }> = [];

    constructor(baseURL: string = 'http://localhost:5003/api') {
        this.baseURL = baseURL;
    }

    private async refreshToken(): Promise<string> {
        const response = await fetch(`${this.baseURL}/token/refresh`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            localStorage.removeItem('accessToken');
            throw new Error('Token refresh failed');
        }

        const data = await response.json();
        const newAccessToken = data.data;
        localStorage.setItem('accessToken', newAccessToken);
        return newAccessToken;
    }

    private processQueue(error: any = null) {
        this.failedQueue.forEach(({ resolve, reject, retry }) => {
            if (error) {
                reject(error);
            } else {
                retry().then(resolve).catch(reject);
            }
        });
        this.failedQueue = [];
    }

    private getAuthHeaders(): HeadersInit {
        const accessToken = localStorage.getItem('accessToken');
        return {
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        };
    }

    async request<T>(url: string, options: RequestInit = {}): Promise<T> {
        // Merge auth headers with any existing headers
        const headers = {
            ...this.getAuthHeaders(),
            ...(options.headers || {}),
        };

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (response.ok) {
            return await response.json();
        }

        if (response.status === 401) {
            return this.handleTokenRefresh(async () => {
                // Get fresh headers after token refresh
                const freshHeaders = {
                    ...this.getAuthHeaders(),
                    ...(options.headers || {}),
                };
                return fetch(url, {
                    ...options,
                    headers: freshHeaders,
                });
            });
        }

        const errorData = await response.json();
        throw errorData;
    }

    private async handleTokenRefresh<T>(
        retryRequest: () => Promise<Response>
    ): Promise<T> {
        if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
                this.failedQueue.push({
                    resolve,
                    reject,
                    retry: async () => {
                        const response = await retryRequest();
                        if (!response.ok) {
                            const errorData = await response.json();
                            throw errorData;
                        }
                        return await response.json();
                    },
                });
            });
        }

        this.isRefreshing = true;

        try {
            await this.refreshToken();
            this.processQueue();

            const response = await retryRequest();
            if (!response.ok) {
                const errorData = await response.json();
                throw errorData;
            }

            return await response.json();
        } catch (error) {
            this.processQueue(error);
            throw error;
        } finally {
            this.isRefreshing = false;
        }
    }

    // Simplified methods - no need to manually handle tokens
    async createTask(taskData: any) {
        return this.request(`${this.baseURL}/task/task`, {
            method: 'POST',
            body: JSON.stringify(taskData),
        });
    }

    async fetchTodayTasks() {
        return this.request(`${this.baseURL}/task/today`, {
            method: 'GET',
        });
    }

    async register(userData: any) {
        return this.request(`${this.baseURL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }
}

export const apiClient = new ApiClient();
