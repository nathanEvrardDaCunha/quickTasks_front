import CreateTaskForm from './components/CreateTaskForm';
import CreateTaskStatusMessage from './components/CreateTaskStatusMessage';
import FetchTaskStatusMessage from './components/FetchTaskStatusMessage';
import useCreateTask from './hooks/useCreateTask';
import useFetchTask from './hooks/useFetchTask';

export default function Today() {
    const { query, displayNonCompletedTask } = useFetchTask();
    const {
        handleAction,
        handleOnChange,
        handleReset,
        mutation,
        createTaskData,
    } = useCreateTask(query);

    return (
        <>
            <header>
                <h2>Website Header</h2>
            </header>
            <main>
                <CreateTaskStatusMessage mutation={mutation} />

                <CreateTaskForm
                    handleAction={handleAction}
                    handleOnChange={handleOnChange}
                    handleReset={handleReset}
                    mutation={mutation}
                    createTaskData={createTaskData}
                />

                <FetchTaskStatusMessage
                    query={query}
                    displayNonCompletedTask={displayNonCompletedTask}
                />
            </main>
            <footer>
                <h2>Website Footer</h2>
            </footer>
        </>
    );
}
