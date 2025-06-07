import './form.scss';

interface BaseInput {
    id: string;
    name: string;
    required?: boolean;
    value?: string;
    onChange?: any;
}

interface TextInput extends BaseInput {
    type: 'text';
    maxlength?: number;
    minlength?: number;
    spellcheck?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

interface EmailInput extends BaseInput {
    type: 'email';
    maxlength?: number;
    minlength?: number;
    disabled?: boolean;
    placeholder?: string;
}

interface PasswordInput extends BaseInput {
    type: 'password';
    maxlength?: number;
    minlength?: number;
    disabled?: boolean;
    placeholder?: string;
}

interface DateInput extends BaseInput {
    type: 'date';
    disabled?: boolean;
    max?: string;
    min?: string;
    step?: number;
}

interface CheckboxInput extends BaseInput {
    type: 'checkbox';
    disabled?: boolean;
    checked?: boolean;
}

interface RadioInput extends BaseInput {
    type: 'radio';
    checked?: boolean;
}

type InputProps =
    | TextInput
    | EmailInput
    | PasswordInput
    | DateInput
    | CheckboxInput
    | RadioInput;

export default function Input(props: InputProps) {
    if (props.type === 'text') {
        return (
            <input
                className="form__input"
                type="text"
                id={props.id}
                name={props.name}
                placeholder={
                    props.placeholder === undefined
                        ? 'Default'
                        : props.placeholder
                }
                value={props.value === undefined ? '' : props.value}
                disabled={props.disabled === undefined ? false : props.disabled}
                required={props.required === undefined ? false : props.required}
                maxLength={
                    props.maxlength === undefined ? 255 : props.maxlength
                }
                minLength={props.minlength === undefined ? 0 : props.minlength}
                spellCheck={
                    props.spellcheck === undefined ? false : props.spellcheck
                }
                inputMode="text"
                onChange={props.onChange}
            />
        );
    }

    if (props.type === 'email') {
        return (
            <input
                className="form__input"
                type="email"
                id={props.id}
                name={props.name}
                placeholder={
                    props.placeholder === undefined
                        ? 'default.email@gmail.com'
                        : props.placeholder
                }
                value={props.value === undefined ? '' : props.value}
                disabled={props.disabled === undefined ? false : props.disabled}
                required={props.required === undefined ? false : props.required}
                maxLength={
                    props.maxlength === undefined ? 255 : props.maxlength
                }
                minLength={props.minlength === undefined ? 0 : props.minlength}
                inputMode="email"
                onChange={props.onChange}
            />
        );
    }

    if (props.type === 'password') {
        return (
            <input
                className="form__input"
                type="password"
                id={props.id}
                name={props.name}
                placeholder={
                    props.placeholder === undefined
                        ? '●●●●●●●●●●●●'
                        : props.placeholder
                }
                value={props.value === undefined ? '' : props.value}
                disabled={props.disabled === undefined ? false : props.disabled}
                required={props.required === undefined ? false : props.required}
                maxLength={
                    props.maxlength === undefined ? 255 : props.maxlength
                }
                minLength={props.minlength === undefined ? 0 : props.minlength}
                inputMode="text"
                onChange={props.onChange}
            />
        );
    }

    if (props.type === 'date') {
        return (
            <input
                className="form__input"
                type="date"
                id={props.id}
                name={props.name}
                value={props.value === undefined ? '2020-01-01' : props.value}
                disabled={props.disabled === undefined ? false : props.disabled}
                required={props.required === undefined ? false : props.required}
                max={props.max === undefined ? '2050-01-01' : props.max}
                min={props.min === undefined ? '1930-01-01' : props.min}
                step={props.step === undefined ? 1 : props.step}
                inputMode="none"
                onChange={props.onChange}
            />
        );
    }

    if (props.type === 'checkbox') {
        return (
            <input
                className="form__input"
                type="checkbox"
                id={props.id}
                name={props.name}
                checked={props.checked === undefined ? false : props.checked}
                disabled={props.disabled === undefined ? false : props.disabled}
                required={props.required === undefined ? false : props.required}
                value={props.value === undefined ? 'default' : props.value}
                inputMode="none"
                onChange={props.onChange}
            />
        );
    }

    return (
        <input
            className="form__input"
            type="radio"
            id={props.id}
            name={props.name}
            checked={props.checked === undefined ? false : props.checked}
            required={props.required === undefined ? false : props.required}
            value={props.value === undefined ? 'default' : props.value}
            inputMode="none"
            onChange={props.onChange}
        />
    );
}
