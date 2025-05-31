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
    function handleOnSelectChange(event) {
        setProjectFilter(event.target.value);
    }

    return (
        <>
            <Header />
            <main>
                <CreateTaskStatusMessage mutation={mutation} />

                <select
                    name="project"
                    id="project"
                    onChange={handleOnSelectChange}
                >
                    {displayAllProject()}
                </select>

                <CreateTaskForm
                    handleAction={handleAction}
                    handleOnChange={handleOnChange}
                    handleReset={handleReset}
                    mutation={mutation}
                    createTaskData={createTaskData}
                />

                <FetchTaskStatusMessage query={query} project={projectFilter} />
            </main>
            <Footer />
        </>
    );
}

export default Today;
