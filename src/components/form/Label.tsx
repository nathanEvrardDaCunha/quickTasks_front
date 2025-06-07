import './form.scss';

interface LabelProps {
    children: string;
    htmlFor: string | undefined;
    style: 'default' | 'radio';
}

export default function Label(props: LabelProps) {
    const className = `form__label--${props.style}`;

    return (
        <label htmlFor={props.htmlFor} className={className}>
            {props.children}
        </label>
    );
}
