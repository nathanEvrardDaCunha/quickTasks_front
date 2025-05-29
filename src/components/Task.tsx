import type { MouseEventHandler } from 'react';

interface TaskProps {
    task: {
        id: number;
        title: string;
        description: string;
        project: string;
        deadline: Date;
        completed: boolean;
    };
    handleOnClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

function Task(props: TaskProps) {
    const { id, title, description, project, deadline } = props.task;
    const handleOnClick = props.handleOnClick;

    return (
        <li key={id}>
            <h4>{title}</h4>

            {description && <p>{description}</p>}

            {project && <p>{project}</p>}

            <time dateTime={deadline.toString()}>{deadline.toString()}</time>
            <button type="button" onClick={handleOnClick}>
                Complete
            </button>
        </li>
    );
}

export default Task;
