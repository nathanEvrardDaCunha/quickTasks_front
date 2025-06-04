import type {
    ResponseError,
    ResponseSuccess,
} from '../../../types/responseTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResetPasswordError extends ResponseError {}

export interface ResetPasswordSuccess extends ResponseSuccess {
    data: null;
}

export type ResetPasswordType = {
    email: string;
};
