// Add a interface instead to add type more easily ?

export default function FetchTaskStatusMessage({
    query,
    displayNonCompletedTask,
}) {
    if (query.isLoading) {
        return <p>Loading today's tasks...</p>;
    }

    if (query.isError) {
        return (
            <h2>Error: {query.error.message || 'Failed to fetch tasks'} </h2>
        );
    }

    if (query.isSuccess && query.data && query.data.tasks.length > 0) {
        return displayNonCompletedTask(query.data.tasks);
    }

    if (!query.isLoading && !query.isError) {
        <p>No tasks for today!</p>;
    }

    return null;
}
