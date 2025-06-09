import type { ChangeEvent } from 'react';
import type {
    CreateTask,
    CreateTaskError,
    CreateTaskSuccess,
} from '../types/typeCreateTask';
import type { UseMutationResult } from '@tanstack/react-query';
import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';
import Label from '../../../components/form/Label';
import Button from '../../../components/ui/Button';
import Heading from '../../../components/ui/Heading';
import Section from '../../../components/ui/Section';
import Textarea from '../../../components/form/Textarea';

interface CreateTaskFormProps {
    handleAction: () => void;
    handleOnChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleReset: () => void;
    mutation: UseMutationResult<
        CreateTaskSuccess,
        CreateTaskError,
        Omit<CreateTask, 'accessToken'>,
        unknown
    >;
    createTaskData: CreateTask;
}

export default function CreateTaskForm({
    handleAction,
    handleOnChange,
    handleReset,
    mutation,
    createTaskData,
}: CreateTaskFormProps) {
    return (
        <Form action={handleAction}>
            <Section variant={'column'} style={{ gap: 16 }}>
                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor="title" style={'default'}>
                        Title
                    </Label>

                    <Heading variant={'p'} markup={'p'}>
                        Write down your task title.
                    </Heading>

                    <Input
                        type="text"
                        name="title"
                        id="title"
                        required={true}
                        value={createTaskData.title}
                        onChange={handleOnChange}
                    />
                </Section>

                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor="description" style={'default'}>
                        Description (Optional)
                    </Label>

                    <Heading variant={'p'} markup={'p'}>
                        Write down your task description.
                    </Heading>

                    <Textarea
                        name="description"
                        id="description"
                        cols={30}
                        rows={10}
                        value={createTaskData.description}
                        onChange={handleOnChange}
                    />
                </Section>

                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor="project" style={'default'}>
                        Project (Optional)
                    </Label>

                    <Heading variant={'p'} markup={'p'}>
                        Write down your task project.
                    </Heading>

                    <Input
                        type="text"
                        name="project"
                        id="project"
                        value={createTaskData.project}
                        onChange={handleOnChange}
                    />
                </Section>

                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor="deadline" style={'default'}>
                        Deadline
                    </Label>

                    <Heading variant={'p'} markup={'p'}>
                        Write down your task deadline.
                    </Heading>

                    <Input
                        type="date"
                        name="deadline"
                        id="deadline"
                        required={true}
                        value={createTaskData.deadline}
                        onChange={handleOnChange}
                    />
                </Section>

                <Section
                    variant={'row'}
                    style={{ justifyContent: 'space-between' }}
                >
                    <Button
                        type="reset"
                        handleOnClick={handleReset}
                        variant={'outline'}
                    >
                        Reset
                    </Button>

                    <Button
                        type="submit"
                        variant={'default'}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? 'Submitting...' : 'Submit'}
                    </Button>
                </Section>
            </Section>
        </Form>
    );
}
