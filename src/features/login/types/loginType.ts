export type LoginUser = {
    email: string;
    password: string;
};

export type LoginError = {
    name: string;
    cause: string;
    stack: string;
};

// Should remove the status from here and the server.
export type LoginResponse = {
    status: string;
    message: string;
    accessToken: string;
    userId: number;
};
