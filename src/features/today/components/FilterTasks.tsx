import Input from '../../../components/form/Input';
import Label from '../../../components/form/Label';
import Select from '../../../components/form/Select';
import Heading from '../../../components/ui/Heading';
import Section from '../../../components/ui/Section';

interface FilterTasksProps {
    handleOnFilterProjectChange: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void;
    displayAllProject: () => React.JSX.Element | React.JSX.Element[];
    handleOnFilterCompletedChange: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void;
    minDate: string;
    handleMinDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    maxDate: string;
    handleMaxDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterTasks(props: FilterTasksProps) {
    return (
        <>
            <Section variant={'column'} style={{ gap: 16 }}>
                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor={'filter-project'} style={'default'}>
                        Project
                    </Label>

                    <Select
                        name="filter-project"
                        id="filter-project"
                        onChange={props.handleOnFilterProjectChange}
                    >
                        {props.displayAllProject()}
                    </Select>
                </Section>

                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor={'filter-completed'} style={'default'}>
                        Completion
                    </Label>

                    <Select
                        name="filter-completed"
                        id="filter-completed"
                        onChange={props.handleOnFilterCompletedChange}
                    >
                        <option value="false">to-complete</option>
                        <option value="true">already-completed</option>
                    </Select>
                </Section>

                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor={'min-date'} style={'default'}>
                        Minimum Deadline
                    </Label>

                    <Input
                        type="date"
                        id="min-date"
                        name="min-date"
                        value={props.minDate}
                        onChange={props.handleMinDateChange}
                    />
                </Section>

                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor={'max-date'} style={'default'}>
                        Maximum Deadline
                    </Label>

                    <Input
                        type="date"
                        id="max-date"
                        name="max-date"
                        value={props.maxDate}
                        onChange={props.handleMaxDateChange}
                    />
                </Section>
            </Section>
        </>
    );
}
