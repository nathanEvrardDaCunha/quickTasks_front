import type { UseMutationResult } from '@tanstack/react-query';
import type { ChangeEvent } from 'react';
import type { LoginError, LoginSuccess, LoginUser } from '../types/loginType';
import { Link } from 'react-router-dom';
import Input from '../../../components/form/Input';
import Label from '../../../components/form/Label';
import Button from '../../../components/ui/Button';
import Heading from '../../../components/ui/Heading';
import Section from '../../../components/ui/Section';
import Form from '../../../components/form/Form';

interface LoginFormProps {
    handleAction: () => void;
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleReset: () => void;
    mutation: UseMutationResult<LoginSuccess, LoginError, LoginUser, unknown>;
    userFormData: {
        email: string;
        password: string;
    };
}

export default function LoginForm({
    handleAction,
    handleOnChange,
    handleReset,
    mutation,
    userFormData,
}: LoginFormProps) {
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

                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor={'password'} style={'default'}>
                        Password
                    </Label>

                    <Heading variant={'p'} markup={'p'}>
                        Write down your password.
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

                <Link to={'/reset-password'}>
                    <Heading variant={'link'} markup={'p'}>
                        Reset Password
                    </Heading>
                </Link>
            </Form>
        </>
    );
}
