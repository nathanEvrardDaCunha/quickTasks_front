export type FetchTask = {
    id: number;
    title: string;
    description: string;
    project: string;
    deadline: Date;
    completed: boolean;
};

export type FetchTaskError = {
    name: string;
    cause: string;
    stack: string;
};

export type FetchTaskSuccess = {
    status: string;
    message: string;
    tasks: FetchTask[];
};
