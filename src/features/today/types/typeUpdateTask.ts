import type {
    ResponseError,
    ResponseSuccess,
} from '../../../types/responseTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateTaskError extends ResponseError {}

export interface UpdateTaskSuccess extends ResponseSuccess {
    data: null;
}
