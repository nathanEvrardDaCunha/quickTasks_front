import type {
    ResponseError,
    ResponseSuccess,
} from '../../../types/responseTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateTaskError extends ResponseError {}

export interface CreateTaskSuccess extends ResponseSuccess {
    data: null;
}

export type CreateTask = {
    accessToken: string;
    title: string;
    description: string;
    project: string;
    deadline: string;
};
