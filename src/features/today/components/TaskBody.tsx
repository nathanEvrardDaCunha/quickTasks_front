import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Heading from '../../../components/ui/Heading';
import Section from '../../../components/ui/Section';

interface TaskBodyProps {
    handleOnUpdateChange: () => void;
    handleOnCompleteClick: () => void;
    handleOnDeleteClick: () => void;
    task: {
        id: number;
        title: string;
        description: string;
        project: string;
        deadline: Date;
        completed: boolean;
    };
}

export default function TaskBody(props: TaskBodyProps) {
    return (
        <Card variant={'outline'} style={{ marginBlockEnd: 16 }}>
            <Heading variant={'h4'} markup={'h4'}>
                {props.task.title}
            </Heading>

            {props.task.description && (
                <Heading variant={'p'} markup={'p'}>
                    {props.task.description}
                </Heading>
            )}

            {props.task.project && (
                <Heading variant={'p'} markup={'p'}>
                    {props.task.project}
                </Heading>
            )}

            <Heading variant={'p'} markup={'p'}>
                {props.task.deadline.toString().split('T')[0]}
            </Heading>

            <Section
                variant={'row'}
                style={{ justifyContent: 'space-between' }}
            >
                <Button
                    type="button"
                    handleOnClick={props.handleOnDeleteClick}
                    variant={'outline'}
                >
                    Delete
                </Button>

                <Button
                    type="button"
                    handleOnClick={props.handleOnUpdateChange}
                    variant={'default'}
                >
                    Update
                </Button>

                {props.task.completed === true ? null : (
                    <Button
                        type="button"
                        handleOnClick={props.handleOnCompleteClick}
                        variant={'default'}
                    >
                        Complete
                    </Button>
                )}
            </Section>
        </Card>
    );
}
