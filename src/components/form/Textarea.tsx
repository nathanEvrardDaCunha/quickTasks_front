import './form.scss';

interface TextareaProps {
    id: string;
    name: string;
    required?: boolean;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    placeholder?: string;
    cols?: number;
    rows?: number;
}

export default function Textarea(props: TextareaProps) {
    return (
        <textarea
            className="form__input"
            id={props.id}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            disabled={props.disabled}
            required={props.required}
            placeholder={props.placeholder}
            cols={props.cols}
            rows={props.rows}
        />
    );
}
