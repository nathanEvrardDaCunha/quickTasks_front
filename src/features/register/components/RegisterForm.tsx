import type { UseMutationResult } from '@tanstack/react-query';
import type { ChangeEvent } from 'react';
import type {
    RegisterError,
    RegisterSuccess,
    RegisterUser,
} from '../types/typeRegister';
import Form from '../../../components/form/Form';
import Label from '../../../components/form/Label';
import Section from '../../../components/ui/Section';
import Button from '../../../components/ui/Button';
import Input from '../../../components/form/Input';
import Heading from '../../../components/ui/Heading';

interface RegisterFormProps {
    handleAction: (formData: FormData) => void;
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleReset: () => void;
    userFormDate: RegisterUser;
    mutation: UseMutationResult<RegisterSuccess, RegisterError>;
}

export default function RegisterForm({
    handleAction,
    handleOnChange,
    handleReset,
    userFormDate,
    mutation,
}: RegisterFormProps) {
    return (
        <>
            <Form action={handleAction}>
                <Section variant={'column'} style={{ gap: 4 }}>
                    <Label htmlFor={'username'} style={'default'}>
                        Username
                    </Label>

                    <Heading variant={'p'} markup={'p'}>
                        Write down your username.
                    </Heading>

                    <Input
                        type="text"
                        name="username"
                        id="username"
                        value={userFormDate.username}
                        onChange={handleOnChange}
                        required
                    />
                </Section>

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
                        value={userFormDate.email}
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
                        value={userFormDate.password}
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
            </Form>
        </>
    );
}
