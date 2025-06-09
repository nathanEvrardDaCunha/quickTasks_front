import type { ChangeEvent } from 'react';
import type {
    ChangePasswordError,
    ChangePasswordSuccess,
    ChangePasswordType,
} from '../types/typeChangePassword';
import type { UseMutationResult } from '@tanstack/react-query';
import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';
import Label from '../../../components/form/Label';
import Button from '../../../components/ui/Button';
import Heading from '../../../components/ui/Heading';
import Section from '../../../components/ui/Section';
import { Link } from 'react-router-dom';

interface ChangePasswordFormProps {
    handleAction: () => void;
    userFormData: ChangePasswordType;
    handleOnChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    mutation: UseMutationResult<
        ChangePasswordSuccess,
        ChangePasswordError,
        ChangePasswordType,
        unknown
    >;
    handleReset: () => void;
}

export default function ChangePasswordForm({
    handleAction,
    userFormData,
    handleOnChange,
    mutation,
    handleReset,
}: ChangePasswordFormProps) {
    return (
        <>
            <Form action={handleAction}>
                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor={'password'} style={'default'}>
                        Password
                    </Label>

                    <Heading variant={'p'} markup={'p'}>
                        Write down your new password.
                    </Heading>

                    <Input
                        type="password"
                        name="password"
                        id="password"
                        value={userFormData.password}
                        onChange={handleOnChange}
                        required
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

                <Link to={'/user'}>
                    <Heading variant={'link'} markup={'p'}>
                        Go to Dashboard
                    </Heading>
                </Link>
            </Form>
        </>
    );
}
