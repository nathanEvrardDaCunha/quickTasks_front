// ===================================================================
// FILE: src/services/ApiClient.ts (CORRECTED)
// ===================================================================

import type { LoginUser } from '../features/login/types/loginType';
import type { RegisterUser } from '../features/register/types/typeRegister';

class ApiClient {
    private baseURL: string;
    private isRefreshing: boolean = false;
    private failedQueue: Array<{
        resolve: (value: unknown) => void;
        reject: (reason?: unknown) => void;
        retry: () => Promise<unknown>;
    }> = [];

    constructor() {
        // CORRECTED LOGIC:
        // This groups the check for the environment variable first. If it's
        // undefined, it will use the localhost fallback. THEN, it appends '/api'.
        this.baseURL =
            (import.meta.env.VITE_API_URL || 'http://localhost:5003') + '/api';
    }

    private async refreshToken(): Promise<string> {
        // refreshToken should also use the request method to be consistent
        const data: { data: string } = await this.request<{ data: string }>(
            '/token/refresh',
            {
                method: 'GET',
                credentials: 'include',
            }
        );
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

    // This is the main fix. The `request` method is now responsible for
    // building the FULL URL, so other methods only need to pass the path.
    async request<T>(path: string, options: RequestInit = {}): Promise<T> {
        const fullUrl = `${this.baseURL}${path}`; // Always prepend baseURL

        const headers = {
            ...this.getAuthHeaders(),
            ...(options.headers || {}),
        };

        const response = await fetch(fullUrl, {
            // Use the constructed fullUrl
            ...options,
            headers,
        });

        if (response.ok) {
            // Handle cases where the response might have no body (e.g., 204 No Content)
            if (response.status === 204) {
                return {} as T;
            }
            // Use .json() directly as it's the most common case
            return await response.json();
        }

        if (response.status === 401) {
            return this.handleTokenRefresh<T>(async () => {
                const freshHeaders = {
                    ...this.getAuthHeaders(),
                    ...(options.headers || {}),
                };
                return fetch(fullUrl, {
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

    // All methods below now pass a relative path to `request`
    async createTask<T>(taskData: {
        title: string;
        description?: string;
        project?: string;
        deadline: string;
    }): Promise<T> {
        return this.request<T>('/task/', {
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
        return this.request<T>(`/task/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(taskData),
        });
    }

    async completeSingleTask<T>(taskData: { id: number }): Promise<T> {
        return this.request<T>(`/task/${taskData.id}/complete`, {
            method: 'PATCH',
            body: JSON.stringify(taskData),
        });
    }

    async changePassword<T>(data: { password: string }): Promise<T> {
        return this.request<T>('/user/password', {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async deleteSingleTask<T>(taskData: { id: number }): Promise<T> {
        return this.request<T>(`/task/${taskData.id}`, {
            method: 'DELETE',
        });
    }

    async fetchTodayTasks<T>(): Promise<T> {
        return this.request<T>('/task/today', {
            method: 'GET',
        });
    }

    async fetchUser<T>(): Promise<T> {
        return this.request<T>('/user', {
            method: 'GET',
        });
    }

    async register<T>(userData: RegisterUser): Promise<T> {
        return this.request<T>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async updateProfile<T>(userData: {
        username: string;
        email: string;
    }): Promise<T> {
        return this.request<T>('/user', {
            method: 'PATCH',
            body: JSON.stringify(userData),
        });
    }

    async logout<T>(): Promise<T> {
        return this.request<T>('/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });
    }

    async deleteAccount<T>(): Promise<T> {
        return this.request<T>('/user', {
            method: 'DELETE',
            credentials: 'include',
        });
    }

    async contact<T>(data: {
        name: string;
        email: string;
        message: string;
    }): Promise<T> {
        return this.request<T>('/contact', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async login<T>(userData: LoginUser): Promise<T> {
        return this.request<T>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(userData),
            credentials: 'include',
        });
    }
}

export const apiClient = new ApiClient();
