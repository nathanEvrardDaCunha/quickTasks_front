import type {
    ResponseError,
    ResponseSuccess,
} from '../../../types/responseTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LoginError extends ResponseError {}

export interface LoginSuccess extends ResponseSuccess {
    data: {
        accessToken: string;
    };
}

export type LoginUser = {
    email: string;
    password: string;
};
