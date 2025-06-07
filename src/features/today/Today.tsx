import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import CreateTaskForm from './components/CreateTaskForm';
import CreateTaskStatusMessage from './components/CreateTaskStatusMessage';
import FetchTaskStatusMessage from './components/FetchTaskStatusMessage';
import useCreateTask from './hooks/useCreateTask';
import useFetchTask from './hooks/useFetchTask';
import FilterTasks from './components/FilterTasks';
import useFilterTask from './hooks/useFilterTask';
import useSortTask from './hooks/useSortTask';
import SortTasks from './components/SortTasks';
import Main from '../../layouts/Main';

// Add Text in the Form for each input field

// Add Text Between the Heading and the Form to describe what is this form about

// Transform the Form

// Use AI to rewrite every text to be more professional

// - Add a placeholder if possible

function Today() {
    const { query } = useFetchTask();

    const {
        handleAction,
        handleOnChange,
        handleReset,
        mutation,
        createTaskData,
    } = useCreateTask(query);

    const {
        handleMaxDateChange,
        handleMinDateChange,
        handleOnFilterCompletedChange,
        handleOnFilterProjectChange,
        displayAllProject,
        maxDate,
        minDate,
        completedFilter,
        projectFilter,
    } = useFilterTask(query);

    const {
        handleDescriptionSortChange,
        handleTitleSortChange,
        handleProjectSortChange,
        handleDeadlineSortChange,
        descriptionSort,
        titleSort,
        projectSort,
        deadlineSort,
    } = useSortTask();

    // When the task has whitespace or 'undefined' as project, the filter display is ""

    return (
        <>
            <Header />

            <Main>
                <CreateTaskStatusMessage mutation={mutation} />

                <FilterTasks
                    handleOnFilterProjectChange={handleOnFilterProjectChange}
                    displayAllProject={displayAllProject}
                    handleOnFilterCompletedChange={
                        handleOnFilterCompletedChange
                    }
                    minDate={minDate}
                    handleMinDateChange={handleMinDateChange}
                    maxDate={maxDate}
                    handleMaxDateChange={handleMaxDateChange}
                />

                <SortTasks
                    deadlineSort={deadlineSort}
                    handleDeadlineSortChange={handleDeadlineSortChange}
                    projectSort={projectSort}
                    handleProjectSortChange={handleProjectSortChange}
                    titleSort={titleSort}
                    handleTitleSortChange={handleTitleSortChange}
                    descriptionSort={descriptionSort}
                    handleDescriptionSortChange={handleDescriptionSortChange}
                />

                <CreateTaskForm
                    handleAction={handleAction}
                    handleOnChange={handleOnChange}
                    handleReset={handleReset}
                    mutation={mutation}
                    createTaskData={createTaskData}
                />

                <FetchTaskStatusMessage
                    query={query}
                    project={projectFilter}
                    completed={completedFilter}
                    minDate={minDate}
                    maxDate={maxDate}
                    deadlineSort={deadlineSort}
                    projectSort={projectSort}
                    titleSort={titleSort}
                    descriptionSort={descriptionSort}
                />
            </Main>

            <Footer />
        </>
    );
}

export default Today;
