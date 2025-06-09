import Label from '../../../components/form/Label';
import Select from '../../../components/form/Select';
import Heading from '../../../components/ui/Heading';
import Section from '../../../components/ui/Section';

interface SortTasksProps {
    deadlineSort: string;
    handleDeadlineSortChange: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void;
    projectSort: string;
    handleProjectSortChange: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void;
    titleSort: string;
    handleTitleSortChange: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void;
    descriptionSort: string;
    handleDescriptionSortChange: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void;
}

export default function SortTasks(props: SortTasksProps) {
    return (
        <>
            <Section variant={'column'} style={{ gap: 16 }}>
                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor="sort-deadline" style={'default'}>
                        Sort by deadline:
                    </Label>
                    <Select
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
                    </Select>
                </Section>

                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor="sort-project" style={'default'}>
                        Sort by project:
                    </Label>
                    <Select
                        name="sort-project"
                        id="sort-project"
                        value={props.projectSort}
                        onChange={props.handleProjectSortChange}
                    >
                        <option value="default">Default (no sorting)</option>
                        <option value="ascending">Ascending (A-Z)</option>
                        <option value="descending">Descending (Z-A)</option>
                    </Select>
                </Section>

                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor="sort-title" style={'default'}>
                        Sort by title:
                    </Label>
                    <Select
                        name="sort-title"
                        id="sort-title"
                        value={props.titleSort}
                        onChange={props.handleTitleSortChange}
                    >
                        <option value="default">Default (no sorting)</option>
                        <option value="ascending">Ascending (A-Z)</option>
                        <option value="descending">Descending (Z-A)</option>
                    </Select>
                </Section>

                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor="sort-description" style={'default'}>
                        Sort by description:
                    </Label>
                    <Select
                        name="sort-description"
                        id="sort-description"
                        value={props.descriptionSort}
                        onChange={props.handleDescriptionSortChange}
                    >
                        <option value="default">Default (no sorting)</option>
                        <option value="ascending">Ascending (A-Z)</option>
                        <option value="descending">Descending (Z-A)</option>
                    </Select>
                </Section>
            </Section>{' '}
        </>
    );
}
