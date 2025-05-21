import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type PostTask = {
    userId: string;
    title: string;
    description: string;
    project: string;
    deadline: string;
};

type APIError = {
    name: string;
    cause: string;
    stack: string;
};

type APISuccess = {
    status: string;
    message: string;
    task: {
        title: string;
        description: string;
        project: string;
        deadline: string;
    };
};

type APIGetTodayResponse = {
    status: string;
    message: string;
    tasks: TodayTask[];
};

type TodayTask = {
    id: number;
    title: string;
    description: string;
    project: string;
    deadline: Date;
    completed: boolean;
};

function Today() {
    const [postTaskData, setPostTaskData] = useState<PostTask>({
        userId: '',
        title: '',
        description: '',
        project: '',
        deadline: '',
    });

    const [getTodayUserId, setGetTodayUserId] = useState<string>('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        console.log('Use effect');

        if (userId) {
            setGetTodayUserId(userId);
        }
    }, []);

    const mutation = useMutation({
        mutationKey: ['postTask'],
        mutationFn: async (task: PostTask) => {
            const result = await fetch(`http://localhost:5003/api/task/task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!result.ok) {
                const errorData: APIError = await result.json();
                throw errorData;
            }

            return (await result.json()) as APISuccess;
        },
        // Delete "temporary"
        onSuccess() {
            handleReset();
            query.refetch();
        },
        onError(error: APIError) {
            console.error(`${error.name}: ${error.cause}`);
        },
    });

    // Should use useEffect or not ?
    const query = useQuery({
        queryKey: ['getTodayTask', getTodayUserId],
        queryFn: async () => {
            if (!getTodayUserId) {
                throw new Error(
                    `Cannot process today task fetch because no user Id has been found in localStorage !`
                );
            }

            const result = await fetch(
                `http://localhost:5003/api/task/today?userId=${getTodayUserId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!result.ok) {
                const errorData: APIError = await result.json();
                throw errorData;
            }

            return (await result.json()) as APIGetTodayResponse;
        },

        enabled: Boolean(getTodayUserId),
    });

    async function handleAction(formData: FormData) {
        // TO-CONSIDER: Instead of using formData, should I use the values store in postTask ?
        // => Would doing this make my component more controlled ?
        const userId = localStorage.getItem('userId');
        const title = formData.get('title');
        const description = formData.get('description');
        const project = formData.get('project');
        const deadline = formData.get('deadline');

        if (!userId) {
            throw new Error(`Couldn't find any userId value in localStorage !`);
        }

        if (!title) {
            throw new Error(`Couldn't find the title property of the form !`);
        }

        if (!description) {
            throw new Error(
                `Couldn't find the description property of the form !`
            );
        }

        if (!project) {
            throw new Error(`Couldn't find the project property of the form !`);
        }

        if (!deadline) {
            throw new Error(
                `Couldn't find the deadline property of the form !`
            );
        }

        const task: PostTask = {
            userId: userId as string,
            title: title as string,
            description: description as string,
            project: project as string,
            deadline: deadline as string,
        };

        mutation.mutate(task);
    }

    function handleOnChange(event: any) {
        const { name, value } = event.target;
        setPostTaskData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleReset() {
        setPostTaskData({
            userId: '',
            title: '',
            description: '',
            project: '',
            deadline: '',
        });
    }

    function displayNonCompletedTask(tasks: TodayTask[]): React.ReactNode {
        const newTasks: TodayTask[] = tasks.filter((task) => {
            if (!task.completed) {
                return task;
            }
        });
        {
            /* Add logic to complete task afterward */
        }

        const taskElements = newTasks.map((task) => {
            return (
                <li key={task.id}>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <p>{task.project}</p>
                    <time dateTime={task.deadline.toString()}>
                        {task.deadline.toString()}
                    </time>
                    <button type="button">Complete</button>
                </li>
            );
        });

        return <ul>{taskElements}</ul>;
    }

    // TO-FIX: The user can send for almost any input "   " whitespace that make the task bug visually
    return (
        <>
            <header>
                <h2>Website Header</h2>
            </header>
            <main>
                <section>
                    {query.isLoading && <p>Loading today's tasks...</p>}

                    {query.isError && (
                        <h2>
                            Error:{' '}
                            {query.error.message || 'Failed to fetch tasks'}
                        </h2>
                    )}

                    {query.isSuccess &&
                    query.data &&
                    query.data.tasks.length > 0
                        ? displayNonCompletedTask(query.data.tasks)
                        : !query.isLoading &&
                          !query.isError && <p>No tasks for today!</p>}
                </section>

                {mutation.isSuccess && (
                    <h2>Success: {(mutation.data as APISuccess).message}</h2>
                )}

                {mutation.error && (
                    <h2>Error: {(mutation.error as APIError).cause} </h2>
                )}

                {mutation.isPending && <h2>Action processing...</h2>}

                <form action={handleAction}>
                    <fieldset>
                        <legend>Task Creation</legend>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required={true}
                            value={postTaskData.title}
                            onChange={handleOnChange}
                        />
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            cols={30}
                            rows={10}
                            required={true}
                            value={postTaskData.description}
                            onChange={handleOnChange}
                        ></textarea>
                        <label htmlFor="project">Project</label>
                        <input
                            type="text"
                            name="project"
                            id="project"
                            required={true}
                            value={postTaskData.project}
                            onChange={handleOnChange}
                        />
                        <label htmlFor="deadline">Deadline</label>
                        {/* Does the date return a string or not ? */}
                        {/* If "date" create problem, try "datetime-local" and the others */}
                        <input
                            type="date"
                            name="deadline"
                            id="deadline"
                            required={true}
                            value={postTaskData.deadline}
                            onChange={handleOnChange}
                        />
                        <button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Submitting...' : 'Submit'}
                        </button>
                        <button type="button" onClick={handleReset}>
                            Reset
                        </button>{' '}
                    </fieldset>
                </form>
            </main>
            <footer>
                <h2>Website Footer</h2>
            </footer>
        </>
    );
}

export default Today;
