import type { JSX } from 'react';
import './button.scss';

interface ButtonProps {
    type: 'button' | 'reset' | 'submit';
    variant: 'default' | 'outline';
    children: string;
    handleOnClick?: any;
    disabled?: boolean;
}

export default function Button({
    type,
    variant,
    children,
    handleOnClick,
    disabled,
}: ButtonProps): JSX.Element {
    const className = `button--${variant}`;

    return (
        <button
            type={type}
            className={className}
            onClick={handleOnClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
