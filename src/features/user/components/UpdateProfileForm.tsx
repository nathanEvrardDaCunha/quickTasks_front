import type { ChangeEvent } from 'react';
import type {
    UpdateProfile,
    UpdateProfileError,
    UpdateProfileSuccess,
} from '../types/typeUpdateProfile';
import type { UseMutationResult } from '@tanstack/react-query';
import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';
import Label from '../../../components/form/Label';
import Button from '../../../components/ui/Button';
import Heading from '../../../components/ui/Heading';
import Section from '../../../components/ui/Section';
import { Link } from 'react-router-dom';

interface UpdateProfileFormProps {
    handleAction: (formData: FormData) => void;
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleReset: () => void;
    mutation: UseMutationResult<
        UpdateProfileSuccess,
        UpdateProfileError,
        UpdateProfile,
        unknown
    >;
    userFormData: UpdateProfile;
}

export default function UpdateProfileForm({
    handleAction,
    handleOnChange,
    handleReset,
    mutation,
    userFormData,
}: UpdateProfileFormProps) {
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
                        value={userFormData.username}
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

                <Link to={'/user'}>
                    <Heading variant={'link'} markup={'p'}>
                        Go to Dashboard
                    </Heading>
                </Link>
            </Form>
        </>
    );
}
