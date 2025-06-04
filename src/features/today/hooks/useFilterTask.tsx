import { useState, type JSX } from 'react';

export default function useFilterTask(query: any) {
    const [projectFilter, setProjectFilter] = useState<string>('all');
    const [completedFilter, setCompletedFilter] = useState<string>('false');
    const [minDate, setMinDate] = useState<string>('1990-01-01');
    const [maxDate, setMaxDate] = useState<string>('2100-01-01');

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

    return {
        handleMaxDateChange,
        handleMinDateChange,
        handleOnFilterCompletedChange,
        handleOnFilterProjectChange,
        displayAllProject,
        maxDate,
        minDate,
        completedFilter,
        projectFilter,
    };
}
