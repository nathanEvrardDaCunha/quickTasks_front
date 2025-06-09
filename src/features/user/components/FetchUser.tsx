import type { UseQueryResult } from '@tanstack/react-query';
import type { JSX } from 'react';
import type { FetchUserSuccess } from '../types/typeFetchUser';
import Status from '../../../components/composed/Status';
import Card from '../../../components/ui/Card';
import Heading from '../../../components/ui/Heading';
import Section from '../../../components/ui/Section';

interface FetchUserProps {
    query: UseQueryResult<FetchUserSuccess, Error>;
}

export default function FetchUser({
    query,
}: FetchUserProps): JSX.Element | null {
    if (query.isLoading) {
        return <Status variant={'pending'}>Loading user...</Status>;
    }

    if (query.isError) {
        return (
            <Status variant={'error'}>
                {query.error.message || 'Failed to fetch user'}
            </Status>
        );
    }

    if (query.isSuccess && query.data) {
        return (
            <Card variant={'column'} classExtension={'personal-info'}>
                <Heading
                    variant={'h3'}
                    markup={'h3'}
                    classExtension={'personal-info'}
                >
                    Personal Data
                </Heading>

                <Section variant={'column'}>
                    <Section variant={'column'}>
                        <Heading
                            variant={'h4'}
                            markup={'h4'}
                            classExtension={'personal-info'}
                        >
                            Username
                        </Heading>

                        <Heading
                            variant={'p'}
                            markup={'p'}
                            classExtension={'personal-info'}
                        >
                            {query.data.data.username}
                        </Heading>
                    </Section>

                    <Section variant={'column'}>
                        <Heading
                            variant={'h4'}
                            markup={'h4'}
                            classExtension={'personal-info'}
                        >
                            Email
                        </Heading>

                        <Heading
                            variant={'p'}
                            markup={'p'}
                            classExtension={'personal-info'}
                        >
                            {query.data.data.email}
                        </Heading>
                    </Section>
                </Section>
            </Card>
        );
    }

    if (!query.isLoading && !query.isError) {
        return <Status variant={'success'}>No user found !</Status>;
    }

    return null;
}
