import type {
    ResponseError,
    ResponseSuccess,
} from '../../../types/responseTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FetchTaskError extends ResponseError {}

export interface FetchTaskSuccess extends ResponseSuccess {
    data: FetchTask[];
}

export type FetchTask = {
    id: number;
    title: string;
    description: string;
    project: string;
    deadline: Date;
    completed: boolean;
};
