import type { JSX } from 'react';
import Heading from '../ui/Heading';
import Card from '../ui/Card';

interface StatusProps {
    children: string;
    variant: 'success' | 'warning' | 'error' | 'pending';
}

export default function Status({
    children,
    variant,
}: StatusProps): JSX.Element {
    const className = `status--${variant}`;
    const title = variant.charAt(0).toUpperCase() + variant.slice(1);
    const messageLines = children.split('\n');
    const isMultiLine = messageLines.length > 1;

    return (
        <Card variant={'column'} classExtension={className}>
            <Heading variant={'h3'} markup={'h3'} classExtension={className}>
                {title}
            </Heading>

            {isMultiLine ? (
                <ul className={className}>
                    {messageLines.map((line, index) => (
                        <li key={index}>
                            <Heading
                                variant={'p'}
                                markup={'p'}
                                classExtension={className}
                            >
                                {line}
                            </Heading>
                        </li>
                    ))}
                </ul>
            ) : (
                <Heading variant={'p'} markup={'p'} classExtension={className}>
                    {children}
                </Heading>
            )}
        </Card>
    );
}
