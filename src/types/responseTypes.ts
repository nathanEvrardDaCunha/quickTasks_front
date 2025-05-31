export interface ResponseSuccess {
    name: string;
    message: string;
    httpCode: number;
    data: any;
    timestamp: string | null;
}

export interface ResponseError {
    name: string;
    cause: string;
    httpCode: number;
}
