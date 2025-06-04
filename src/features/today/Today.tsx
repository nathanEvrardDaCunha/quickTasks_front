import { useState, type JSX } from 'react';
import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import CreateTaskForm from './components/CreateTaskForm';
import CreateTaskStatusMessage from './components/CreateTaskStatusMessage';
import FetchTaskStatusMessage from './components/FetchTaskStatusMessage';
import useCreateTask from './hooks/useCreateTask';
import useFetchTask from './hooks/useFetchTask';
import FilterTasks from './components/FilterTasks';
import useFilterTask from './hooks/useFilterTask';

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

    const [deadlineSort, setDeadlineSort] = useState<string>('default');
    const [projectSort, setProjectSort] = useState<string>('default');
    const [titleSort, setTitleSort] = useState<string>('default');
    const [descriptionSort, setDescriptionSort] = useState<string>('default');

    function handleDeadlineSortChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setDeadlineSort(event.target.value);
    }

    function handleProjectSortChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setProjectSort(event.target.value);
    }

    function handleTitleSortChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setTitleSort(event.target.value);
    }

    function handleDescriptionSortChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setDescriptionSort(event.target.value);
    }

    return (
        <>
            <Header />
            <main>
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

                <section>
                    <h3>Sorting</h3>
                    <div>
                        <label htmlFor="sort-deadline">Sort by deadline:</label>
                        <select
                            name="sort-deadline"
                            id="sort-deadline"
                            value={deadlineSort}
                            onChange={handleDeadlineSortChange}
                        >
                            <option value="default">
                                Default (no sorting)
                            </option>
                            <option value="ascending">
                                Ascending (earliest first)
                            </option>
                            <option value="descending">
                                Descending (latest first)
                            </option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="sort-project">Sort by project:</label>
                        <select
                            name="sort-project"
                            id="sort-project"
                            value={projectSort}
                            onChange={handleProjectSortChange}
                        >
                            <option value="default">
                                Default (no sorting)
                            </option>
                            <option value="ascending">Ascending (A-Z)</option>
                            <option value="descending">Descending (Z-A)</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="sort-title">Sort by title:</label>
                        <select
                            name="sort-title"
                            id="sort-title"
                            value={titleSort}
                            onChange={handleTitleSortChange}
                        >
                            <option value="default">
                                Default (no sorting)
                            </option>
                            <option value="ascending">Ascending (A-Z)</option>
                            <option value="descending">Descending (Z-A)</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="sort-description">
                            Sort by description:
                        </label>
                        <select
                            name="sort-description"
                            id="sort-description"
                            value={descriptionSort}
                            onChange={handleDescriptionSortChange}
                        >
                            <option value="default">
                                Default (no sorting)
                            </option>
                            <option value="ascending">Ascending (A-Z)</option>
                            <option value="descending">Descending (Z-A)</option>
                        </select>
                    </div>
                </section>

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
            </main>
            <Footer />
        </>
    );
}

export default Today;
