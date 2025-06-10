class ApiClient {
    private baseURL: string;
    private isRefreshing: boolean = false;
    private failedQueue: Array<{
        resolve: (value: unknown) => void;
        reject: (reason?: unknown) => void;
        retry: () => Promise<unknown>;
    }> = [];

    apiUrl = import.meta.env.VITE_API_URL;

    constructor(baseURL: string = `{apiUrl}/api`) {
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

        const data: { data: string } = await response.json();
        const newAccessToken = data.data;
        localStorage.setItem('accessToken', newAccessToken);
        return newAccessToken;
    }

    private processQueue(error: Error | null = null) {
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
            return this.handleTokenRefresh<T>(async () => {
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
            return new Promise<T>((resolve, reject) => {
                this.failedQueue.push({
                    resolve: (value) => resolve(value as T),
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
            this.processQueue(
                error instanceof Error ? error : new Error(String(error))
            );
            throw error;
        } finally {
            this.isRefreshing = false;
        }
    }

    async createTask<T>(taskData: {
        title: string;
        description?: string;
        project?: string;
        deadline: string;
    }): Promise<T> {
        return this.request<T>(`${this.baseURL}/task/`, {
            method: 'POST',
            body: JSON.stringify(taskData),
        });
    }

    async updateTask<T>(
        taskData: {
            title: string;
            description?: string;
            project?: string;
            deadline: string;
        },
        id: number
    ): Promise<T> {
        return this.request<T>(`${this.baseURL}/task/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(taskData),
        });
    }

    async completeSingleTask<T>(taskData: { id: number }): Promise<T> {
        return this.request<T>(`${this.baseURL}/task/${taskData.id}/complete`, {
            method: 'PATCH',
            body: JSON.stringify(taskData),
        });
    }

    async changePassword<T>(data: { password: string }): Promise<T> {
        return this.request<T>(`${this.baseURL}/user/password`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async deleteSingleTask<T>(taskData: { id: number }): Promise<T> {
        return this.request<T>(`${this.baseURL}/task/${taskData.id}`, {
            method: 'DELETE',
        });
    }

    async fetchTodayTasks<T>(): Promise<T> {
        return this.request<T>(`${this.baseURL}/task/today`, {
            method: 'GET',
        });
    }

    async fetchUser<T>(): Promise<T> {
        return this.request<T>(`${this.baseURL}/user`, {
            method: 'GET',
        });
    }

    async register<T>(userData: {
        username: string;
        email: string;
        password: string;
    }): Promise<T> {
        return this.request<T>(`${this.baseURL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async updateProfile<T>(userData: {
        username: string;
        email: string;
    }): Promise<T> {
        return this.request<T>(`${this.baseURL}/user`, {
            method: 'PATCH',
            body: JSON.stringify(userData),
        });
    }

    async logout<T>(): Promise<T> {
        return this.request<T>(`${this.baseURL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
    }

    async deleteAccount<T>(): Promise<T> {
        return this.request<T>(`${this.baseURL}/user`, {
            method: 'DELETE',
            credentials: 'include',
        });
    }

    async contact<T>(data: {
        name: string;
        email: string;
        message: string;
    }): Promise<T> {
        console.log(data.name);
        console.log(data.email);
        console.log(data.message);
        return this.request<T>(`${this.baseURL}/contact`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}

export const apiClient = new ApiClient();
