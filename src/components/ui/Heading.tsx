import type { JSX } from 'react';
import './heading.scss';

interface HeadingProps {
    children: string | React.ReactNode;
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small' | 'link';
    markup: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small';
    classExtension?: string;
}

export default function Heading({
    variant,
    children,
    markup,
    classExtension,
}: HeadingProps): JSX.Element {
    const className = `heading--${variant} ${classExtension}`;

    const Tag = markup as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
}
