import './form.scss';

interface SelectProps {
    id: string;
    name: string;
    required?: boolean;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
    disabled?: boolean;
    multiple?: boolean;
    size?: number;
}

export default function Select(props: SelectProps) {
    return (
        <select
            className={'form__select'}
            id={props.id}
            name={props.name}
            value={props.value}
            disabled={props.disabled === undefined ? false : props.disabled}
            required={props.required === undefined ? false : props.required}
            multiple={props.multiple === undefined ? false : props.multiple}
            size={props.size === undefined ? undefined : props.size}
            onChange={props.onChange}
        >
            {props.children}
        </select>
    );
}
