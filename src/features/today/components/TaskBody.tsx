interface TaskBodyProps {
    handleOnUpdateChange: () => void;
    handleOnCompleteClick: () => void;
    handleOnDeleteClick: () => void;
    task: {
        id: number;
        title: string;
        description: string;
        project: string;
        deadline: Date;
        completed: boolean;
    };
}

export default function TaskBody(props: TaskBodyProps) {
    return (
        <>
            <h4>{props.task.title}</h4>

            {props.task.description && <p>{props.task.description}</p>}

            {props.task.project && <p>{props.task.project}</p>}

            <time dateTime={props.task.deadline.toString().split('T')[0]}>
                {props.task.deadline.toString().split('T')[0]}
            </time>

            <section>
                <button type="button" onClick={props.handleOnUpdateChange}>
                    Update
                </button>
                <button type="button" onClick={props.handleOnCompleteClick}>
                    Complete
                </button>
                <button type="button" onClick={props.handleOnDeleteClick}>
                    Delete
                </button>
            </section>
        </>
    );
}
