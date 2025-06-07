import type { JSX } from 'react';
import './button.scss';

interface ButtonProps {
    type: 'button';
    variant: 'default' | 'outline';
    children: string;
    handleOnClick?: any;
}

// Add Icon to button ?

export default function Button({
    type,
    variant,
    children,
    handleOnClick,
}: ButtonProps): JSX.Element {
    if (variant === 'outline') {
        return (
            <button
                type={type}
                className="button--outline"
                onClick={handleOnClick}
            >
                {children}
            </button>
        );
    }

    return (
        <button type={type} className="button" onClick={handleOnClick}>
            {children}
        </button>
    );
}
