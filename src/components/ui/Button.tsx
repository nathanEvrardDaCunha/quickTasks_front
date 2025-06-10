import type { JSX, ReactNode, MouseEvent } from 'react';
import './button.scss';

interface ButtonProps {
    type: 'button' | 'reset' | 'submit';
    variant: 'default' | 'outline' | 'dark-outline';
    children: ReactNode;
    handleOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    style?: React.CSSProperties;
}

export default function Button({
    type,
    variant,
    children,
    handleOnClick,
    disabled,
    style,
}: ButtonProps): JSX.Element {
    const className = `button--${variant}`;

    return (
        <button
            type={type}
            className={className}
            onClick={handleOnClick}
            disabled={disabled}
            style={style}
        >
            {children}
        </button>
    );
}
