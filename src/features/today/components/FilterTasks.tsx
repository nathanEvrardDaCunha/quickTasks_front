interface FilterTasksProps {
    handleOnFilterProjectChange: any;
    displayAllProject: any;
    handleOnFilterCompletedChange: any;
    minDate: any;
    handleMinDateChange: any;
    maxDate: any;
    handleMaxDateChange: any;
}

export default function FilterTasks(props: FilterTasksProps) {
    return (
        <section>
            <h3>Filters</h3>
            <label htmlFor="filter-project">Filter task based on project</label>
            <select
                name="filter-project"
                id="filter-project"
                onChange={props.handleOnFilterProjectChange}
            >
                {props.displayAllProject()}
            </select>

            <label htmlFor="filter-completed">
                Filter task based on completion
            </label>
            <select
                name="filter-completed"
                id="filter-completed"
                onChange={props.handleOnFilterCompletedChange}
            >
                <option value="false">to-complete</option>
                <option value="true">already-completed</option>
            </select>

            <div>
                <label htmlFor="min-date">Minimum deadline date:</label>
                <input
                    type="date"
                    id="min-date"
                    value={props.minDate}
                    onChange={props.handleMinDateChange}
                />
            </div>

            <div>
                <label htmlFor="max-date">Maximum deadline date:</label>
                <input
                    type="date"
                    id="max-date"
                    value={props.maxDate}
                    onChange={props.handleMaxDateChange}
                />
            </div>
        </section>
    );
}
