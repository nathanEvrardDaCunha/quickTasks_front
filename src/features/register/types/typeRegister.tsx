export type RegisterUser = {
    username: string;
    email: string;
    password: string;
};

export type RegisterError = {
    name: string;
    cause: string;
    stack: string;
};

// Should remove the status from here and the server.
export type RegisterResponse = {
    status: string;
    message: string;
};
