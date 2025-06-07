import './form.scss';

interface FormProps {
    children: React.ReactNode;
    action: (formData: FormData) => void;
}

export default function Form({ children, action }: FormProps) {
    return (
        <form action={action} className="form">
            {children}
        </form>
    );
}
