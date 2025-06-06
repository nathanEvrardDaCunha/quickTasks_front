import type {
    ResponseError,
    ResponseSuccess,
} from '../../../types/responseTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateProfileError extends ResponseError {}

export interface UpdateProfileSuccess extends ResponseSuccess {
    data: null;
}

export type UpdateProfile = {
    username: string;
    email: string;
};
