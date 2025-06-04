interface SortTasksProps {
    deadlineSort: any;
    handleDeadlineSortChange: any;
    projectSort: any;
    handleProjectSortChange: any;
    titleSort: any;
    handleTitleSortChange: any;
    descriptionSort: any;
    handleDescriptionSortChange: any;
}

export default function SortTasks(props: SortTasksProps) {
    return (
        <section>
            <h3>Sorting</h3>
            <div>
                <label htmlFor="sort-deadline">Sort by deadline:</label>
                <select
                    name="sort-deadline"
                    id="sort-deadline"
                    value={props.deadlineSort}
                    onChange={props.handleDeadlineSortChange}
                >
                    <option value="default">Default (no sorting)</option>
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
                    value={props.projectSort}
                    onChange={props.handleProjectSortChange}
                >
                    <option value="default">Default (no sorting)</option>
                    <option value="ascending">Ascending (A-Z)</option>
                    <option value="descending">Descending (Z-A)</option>
                </select>
            </div>

            <div>
                <label htmlFor="sort-title">Sort by title:</label>
                <select
                    name="sort-title"
                    id="sort-title"
                    value={props.titleSort}
                    onChange={props.handleTitleSortChange}
                >
                    <option value="default">Default (no sorting)</option>
                    <option value="ascending">Ascending (A-Z)</option>
                    <option value="descending">Descending (Z-A)</option>
                </select>
            </div>

            <div>
                <label htmlFor="sort-description">Sort by description:</label>
                <select
                    name="sort-description"
                    id="sort-description"
                    value={props.descriptionSort}
                    onChange={props.handleDescriptionSortChange}
                >
                    <option value="default">Default (no sorting)</option>
                    <option value="ascending">Ascending (A-Z)</option>
                    <option value="descending">Descending (Z-A)</option>
                </select>
            </div>
        </section>
    );
}
