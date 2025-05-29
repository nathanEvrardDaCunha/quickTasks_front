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

export type RegisterResponse = {
    status: string;
    message: string;
};
