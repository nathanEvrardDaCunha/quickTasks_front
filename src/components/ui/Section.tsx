import type { JSX } from 'react';
import './section.scss';

interface SectionProps {
    children: React.ReactNode;
    variant: 'row' | 'column';
    style?: React.CSSProperties;
}

export default function Section({
    children,
    variant,
    style,
}: SectionProps): JSX.Element {
    const className = `section--${variant}`;

    return (
        <section className={className} style={style}>
            {children}
        </section>
    );
}
