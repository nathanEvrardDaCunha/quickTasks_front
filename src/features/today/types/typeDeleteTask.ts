import type {
    ResponseError,
    ResponseSuccess,
} from '../../../types/responseTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteTaskError extends ResponseError {}

export interface DeleteTaskSuccess extends ResponseSuccess {
    data: null;
}
