import type {
    ResponseError,
    ResponseSuccess,
} from '../../../types/responseTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ChangePasswordError extends ResponseError {}

export interface ChangePasswordSuccess extends ResponseSuccess {
    data: null;
}

export interface ChangePasswordType {
    password: string;
}
