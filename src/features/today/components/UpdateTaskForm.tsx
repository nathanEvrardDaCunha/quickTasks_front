import type { UseMutationResult } from '@tanstack/react-query';
import type { CreateTask } from '../types/typeCreateTask';
import type {
    UpdateTaskSuccess,
    UpdateTaskError,
} from '../types/typeUpdateTask';
import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';
import Label from '../../../components/form/Label';
import Textarea from '../../../components/form/Textarea';
import Button from '../../../components/ui/Button';
import Heading from '../../../components/ui/Heading';
import Section from '../../../components/ui/Section';

interface UpdateTaskFormProps {
    handleAction: () => void;
    createTaskData: CreateTask;
    handleOnChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleOnUpdateChange: () => void;
    updateMutation: UseMutationResult<
        UpdateTaskSuccess,
        UpdateTaskError,
        Omit<CreateTask, 'accessToken'>,
        unknown
    >;
    handleReset: () => void;
}

export default function UpdateTaskForm(props: UpdateTaskFormProps) {
    return (
        <Form action={props.handleAction}>
            <Section variant={'column'} style={{ gap: 16 }}>
                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor="title" style={'default'}>
                        Title
                    </Label>
                    <Heading variant={'p'} markup={'p'}>
                        Update your task title.
                    </Heading>
                    <Input
                        type="text"
                        name="title"
                        id="title"
                        required={true}
                        value={props.createTaskData.title}
                        onChange={props.handleOnChange}
                    />
                </Section>

                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor="description" style={'default'}>
                        Description (Optional)
                    </Label>
                    <Heading variant={'p'} markup={'p'}>
                        Update your task description.
                    </Heading>
                    <Textarea
                        name="description"
                        id="description"
                        cols={30}
                        rows={10}
                        value={props.createTaskData.description}
                        onChange={props.handleOnChange}
                    />
                </Section>

                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor="project" style={'default'}>
                        Project (Optional)
                    </Label>
                    <Heading variant={'p'} markup={'p'}>
                        Update your task project.
                    </Heading>
                    <Input
                        type="text"
                        name="project"
                        id="project"
                        value={props.createTaskData.project}
                        onChange={props.handleOnChange}
                    />
                </Section>

                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor="deadline" style={'default'}>
                        Deadline
                    </Label>
                    <Heading variant={'p'} markup={'p'}>
                        Update your task deadline.
                    </Heading>
                    <Input
                        type="date"
                        name="deadline"
                        id="deadline"
                        required={true}
                        value={props.createTaskData.deadline}
                        onChange={props.handleOnChange}
                    />
                </Section>

                <Section
                    variant={'row'}
                    style={{ justifyContent: 'space-between', gap: 8 }}
                >
                    <Button
                        type="button"
                        handleOnClick={props.handleOnUpdateChange}
                        variant={'outline'}
                    >
                        Close
                    </Button>

                    <Button
                        type="reset"
                        handleOnClick={props.handleReset}
                        variant={'outline'}
                    >
                        Reset
                    </Button>

                    <Button
                        type="submit"
                        variant={'default'}
                        disabled={props.updateMutation.isPending}
                    >
                        {props.updateMutation.isPending
                            ? 'Submitting...'
                            : 'Submit'}
                    </Button>
                </Section>
            </Section>
        </Form>
    );
}
