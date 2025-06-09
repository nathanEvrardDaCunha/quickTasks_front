import type { UseMutationResult } from '@tanstack/react-query';
import type { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import type {
    ResetPasswordSuccess,
    ResetPasswordError,
    ResetPasswordType,
} from '../types/typeResetPassword';
import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';
import Label from '../../../components/form/Label';
import Button from '../../../components/ui/Button';
import Heading from '../../../components/ui/Heading';
import Section from '../../../components/ui/Section';

interface ResetPasswordFormProps {
    handleAction: () => void;
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleReset: () => void;
    mutation: UseMutationResult<
        ResetPasswordSuccess,
        ResetPasswordError,
        ResetPasswordType,
        unknown
    >;
    userFormData: ResetPasswordType;
}

export default function ResetPasswordForm({
    handleAction,
    handleOnChange,
    handleReset,
    mutation,
    userFormData,
}: ResetPasswordFormProps) {
    return (
        <>
            <Form action={handleAction}>
                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor={'email'} style={'default'}>
                        Email Address
                    </Label>

                    <Heading variant={'p'} markup={'p'}>
                        Write down your email address.
                    </Heading>

                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={userFormData.email}
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

                <Link to={'/login'}>
                    <Heading variant={'link'} markup={'p'}>
                        Go to Sign In
                    </Heading>
                </Link>
            </Form>
        </>
    );
}
