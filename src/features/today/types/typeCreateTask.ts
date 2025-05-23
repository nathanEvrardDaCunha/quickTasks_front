export type CreateTaskData = {
    title: string;
    description: string;
    project: string;
    deadline: string;
};

export type CreateTaskError = {
    name: string;
    cause: string;
    stack: string;
};

export type CreateTaskSuccess = {
    status: string;
    message: string;
    task: {
        title: string;
        description: string;
        project: string;
        deadline: string;
    };
};
