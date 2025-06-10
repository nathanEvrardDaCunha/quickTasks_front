export interface ResponseSuccess {
    name: string;
    message: string;
    httpCode: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    timestamp: string | null;
}

export interface ResponseError {
    name: string;
    cause: string;
    httpCode: number;
}
