import CreateTaskForm from './components/CreateTaskForm';
import CreateTaskStatusMessage from './components/CreateTaskStatusMessage';
import FetchTaskStatusMessage from './components/FetchTaskStatusMessage';
import useCreateTask from './hooks/useCreateTask';
import useFetchTask from './hooks/useFetchTask';

// Might be a good idea to create my custom Error with more detail ?

{
    /* Allow user to create new task for any day */
}
{
    /* Allow user to complete one today task */
}
{
    /* Allow user to delete one today task */
}
{
    /* Allow user to modify one today task */
}

// TO-DO: Add Error Boundaries to avoid crashing the page !

//
//
//
// Setup typescript (make it work with docker without hot reload)
//
// Test every functionalities
//
// Rewrite everything to typescript (type of param + type of output)
//
// Test every functionalities
//
//
//

function Today() {
    const { query, displayNonCompletedTask } = useFetchTask();

    const {
        handleAction,
        handleOnChange,
        handleReset,
        mutation,
        createTaskData,
    } = useCreateTask(query);

    // TO-FIX: The user can send for almost any input "   " whitespace that make the task bug visually
    // TO-FIX: When /today accessed directly without authentication => no userId => Unexpected Application Error
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

export default Today;
