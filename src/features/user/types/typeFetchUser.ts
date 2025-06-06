import type {
    ResponseError,
    ResponseSuccess,
} from '../../../types/responseTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FetchUserError extends ResponseError {}

export interface FetchUserSuccess extends ResponseSuccess {
    data: FetchUserData;
}

export type FetchUserData = {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
};
