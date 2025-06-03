import { useState, type JSX } from 'react';
import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import CreateTaskForm from './components/CreateTaskForm';
import CreateTaskStatusMessage from './components/CreateTaskStatusMessage';
import FetchTaskStatusMessage from './components/FetchTaskStatusMessage';
import useCreateTask from './hooks/useCreateTask';
import useFetchTask from './hooks/useFetchTask';

function Today() {
    const { query } = useFetchTask();

    const {
        handleAction,
        handleOnChange,
        handleReset,
        mutation,
        createTaskData,
    } = useCreateTask(query);

    const [projectFilter, setProjectFilter] = useState<string>('all');
    const [completedFilter, setCompletedFilter] = useState<string>('false');
    const [minDate, setMinDate] = useState<string>('1990-01-01');
    const [maxDate, setMaxDate] = useState<string>('2100-01-01');

    const [deadlineSort, setDeadlineSort] = useState<string>('default');
    const [projectSort, setProjectSort] = useState<string>('default');
    const [titleSort, setTitleSort] = useState<string>('default');
    const [descriptionSort, setDescriptionSort] = useState<string>('default');

    function displayAllProject(): JSX.Element | JSX.Element[] {
        const projects = [
            <option key="all" value="all">
                all
            </option>,
        ];

        if (query.data) {
            const projectsTask: string[] = query.data.data
                .map((task) => task.project)
                .filter(
                    (project): project is string =>
                        project !== undefined && project !== 'all'
                );

            const uniqueProjects: string[] = [...new Set(projectsTask)];

            uniqueProjects.forEach((project) => {
                projects.push(
                    <option key={project} value={project}>
                        {project}
                    </option>
                );
            });
        }

        return projects;
    }

    function handleOnFilterProjectChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setProjectFilter(event.target.value);
    }

    function handleOnFilterCompletedChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setCompletedFilter(event.target.value);
    }

    function handleMinDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMinDate(event.target.value);
    }

    function handleMaxDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMaxDate(event.target.value);
    }

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

                <section>
                    <h3>Filters</h3>
                    <label htmlFor="filter-project">
                        Filter task based on project
                    </label>
                    <select
                        name="filter-project"
                        id="filter-project"
                        onChange={handleOnFilterProjectChange}
                    >
                        {displayAllProject()}
                    </select>

                    <label htmlFor="filter-completed">
                        Filter task based on completion
                    </label>
                    <select
                        name="filter-completed"
                        id="filter-completed"
                        onChange={handleOnFilterCompletedChange}
                    >
                        <option value="false">to-complete</option>
                        <option value="true">already-completed</option>
                    </select>

                    <div>
                        <label htmlFor="min-date">Minimum deadline date:</label>
                        <input
                            type="date"
                            id="min-date"
                            value={minDate}
                            onChange={handleMinDateChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="max-date">Maximum deadline date:</label>
                        <input
                            type="date"
                            id="max-date"
                            value={maxDate}
                            onChange={handleMaxDateChange}
                        />
                    </div>
                </section>

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
