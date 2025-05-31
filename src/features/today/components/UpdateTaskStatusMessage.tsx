interface UpdateTaskStatusMessageProps {
    updateMutation: any;
}

export default function UpdateTaskStatusMessage(
    props: UpdateTaskStatusMessageProps
) {
    if (props.updateMutation.isPending) {
        return <p>Loading update tasks...</p>;
    }

    if (props.updateMutation.isError) {
        return (
            <h2>
                Error:{' '}
                {props.updateMutation.error.cause || 'Failed to update task'}{' '}
            </h2>
        );
    }

    if (props.updateMutation.isSuccess) {
        return <h2>Update task successfully</h2>;
    }

    return <p>No Update yet !</p>;
}
