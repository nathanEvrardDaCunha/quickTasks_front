import type {
    ResponseError,
    ResponseSuccess,
} from '../../../types/responseTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RegisterError extends ResponseError {}

export interface RegisterSuccess extends ResponseSuccess {
    data: null;
}

export type RegisterUser = {
    username: string;
    email: string;
    password: string;
};
