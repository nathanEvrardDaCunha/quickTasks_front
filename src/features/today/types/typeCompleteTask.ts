import type {
    ResponseError,
    ResponseSuccess,
} from '../../../types/responseTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CompleteTaskError extends ResponseError {}

export interface CompleteTaskSuccess extends ResponseSuccess {
    data: null;
}
