import type { JSX } from 'react';
import './card.scss';

interface CardProps {
    children: React.ReactNode;
    variant: 'row' | 'column';
    classExtension?: string;
}

export default function Card({
    children,
    variant,
    classExtension,
}: CardProps): JSX.Element {
    const className = `card--${variant} ${classExtension}`;

    return <article className={className}>{children}</article>;
}
