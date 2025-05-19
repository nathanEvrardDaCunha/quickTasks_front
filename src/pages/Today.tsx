import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

type Task = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    project: string;
    deadline: string; //Date or string ?
};

type PostTask = {
    userId: string;
    title: string;
    description: string;
    project: string;
    deadline: string; //Date or string ?
};

type APIError = {
    name: string;
    cause: string;
    stack: string;
};

type APISuccess = {
    status: string;
    message: string;
    temporary: {
        title: string;
        description: string;
        project: string;
        deadline: string;
    };
};

// Create custom Error more detailed ?

function Today() {
    const [formData, setFormData] = useState<PostTask>({
        userId: '',
        title: '',
        description: '',
        project: '',
        deadline: '',
    });

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

            return await result.json();
        },
        // Delete "temporary"
        onSuccess(temporary: APISuccess) {
            console.log(temporary);
            handleReset();
        },
        onError(error: APIError) {
            console.error(`${error.name}: ${error.cause}`);
        },
    });

    function handleAction(formData: FormData) {
        const userId = localStorage.getItem('userId');
        const title = formData.get('title');
        const description = formData.get('description');
        const project = formData.get('project');
        const deadline = formData.get('deadline');

        // TO-DO: Add Error Boundaries to avoid crashing the page !
        if (!userId) {
            throw new Error(
                `Couldn't find the userId property in localStorage !`
            );
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
            userId: userId,
            title: title as string,
            description: description as string,
            project: project as string,
            deadline: deadline as string, //Date or string ?
        };

        mutation.mutate(task);
    }

    function handleOnChange(event: any) {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleReset() {
        setFormData({
            userId: '',
            title: '',
            description: '',
            project: '',
            deadline: '',
        });
    }

    return (
        <>
            <header>
                <h2>Website Header</h2>
            </header>
            <main>
                {/* Display the task due today and the one that are not complete but should have been completed earlier */}
                <h1>Today Task</h1>
                {/* Allow user to create new task for any day */}
                {/* Allow user to complete one today task */}
                {/* Allow user to delete one today task */}
                {/* Allow user to modify one today task */}

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
                            value={formData.title}
                            onChange={handleOnChange}
                        />
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            cols={30}
                            rows={10}
                            required={true}
                            value={formData.description}
                            onChange={handleOnChange}
                        ></textarea>
                        <label htmlFor="project">Project</label>
                        <input
                            type="text"
                            name="project"
                            id="project"
                            required={true}
                            value={formData.project}
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
                            value={formData.deadline}
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
