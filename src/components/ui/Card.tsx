import type { JSX } from 'react';
import './card.scss';

interface CardProps {
    children: React.ReactNode;
    variant: 'row' | 'column';
    classExtension?: string;
    style?: React.CSSProperties;
}

export default function Card({
    children,
    variant,
    classExtension,
    style,
}: CardProps): JSX.Element {
    const className = `card--${variant} ${classExtension}`;

    return (
        <article className={className} style={style}>
            {children}
        </article>
    );
}
