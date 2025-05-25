export type LoginUser = {
    email: string;
    password: string;
};

export type LoginError = {
    name: string;
    cause: string;
    httpCode: string | number;
    stack: string;
};

// Should remove the status from here and the server.
export type LoginResponse = {
    status: string;
    name: string;
    message: string;
    httpCode: string | number;
    data: any;
    timestamp: Date | string;
};
