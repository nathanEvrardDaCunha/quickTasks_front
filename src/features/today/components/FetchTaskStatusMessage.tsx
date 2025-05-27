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

    // type the query.data to avoid any future issues
    if (query.isSuccess && query.data && query.data.data.length > 0) {
        return displayNonCompletedTask(query.data.data);
    }

    if (!query.isLoading && !query.isError) {
        <p>No tasks for today!</p>;
    }

    return null;
}
