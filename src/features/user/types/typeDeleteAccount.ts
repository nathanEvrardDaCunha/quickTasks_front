import type {
    ResponseError,
    ResponseSuccess,
} from '../../../types/responseTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteAccountError extends ResponseError {}

export interface DeleteAccountSuccess extends ResponseSuccess {
    data: null;
}

export interface DeleteAccount {
    password: string;
}
