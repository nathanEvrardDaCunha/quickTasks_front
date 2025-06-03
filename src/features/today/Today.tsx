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

    function displayAllProject(): JSX.Element | JSX.Element[] {
        if (query.data) {
            const projectsTask: string[] = query.data.data.map((task) => {
                if (task.project) {
                    return task.project;
                }
                return 'all';
            });

            // UX: Sort the project ascending for easier search

            const uniqueProjects: string[] = [...new Set(projectsTask)];

            const projects = uniqueProjects.map((project) => {
                return (
                    <option key={project} value={project}>
                        {project}
                    </option>
                );
            });

            return projects;
        }
        return <option value="all">all</option>;
    }

    // Add type for event
    function handleOnFilterProjectChange(event) {
        setProjectFilter(event.target.value);
    }

    // Add type for event
    function handleOnFilterCompletedChange(event) {
        setCompletedFilter(event.target.value);
    }

    function handleMinDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMinDate(event.target.value);
    }

    function handleMaxDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMaxDate(event.target.value);
    }

    return (
        <>
            <Header />
            <main>
                <CreateTaskStatusMessage mutation={mutation} />

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
                />
            </main>
            <Footer />
        </>
    );
}

export default Today;
