export type LoginUser = {
    email: string;
    password: string;
};

export type LoginError = {
    name: string;
    cause: string;
    stack: string;
};

// Create a common CustomResponse because every response coming from the backend are either the same ?
// name: string = '';
// message: string = '';
// httpCode: number = 200;
// data: any = null;
// timestamp: string | null = null;
export type LoginResponse = {
    status: string;
    name: string;
    message: string;
    httpCode: string | number;
    data: any;
    timestamp: Date | string;
};

// Create a common CustomError because every error coming from the backend are the same ?
// export type RegisterError = {
//     name: string;
//     cause: string;
//     stack: string;
// };
