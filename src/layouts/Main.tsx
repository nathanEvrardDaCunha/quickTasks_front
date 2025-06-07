import './main.scss';

interface MainProps {
    children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
    return <main className="container__main">{children}</main>;
}
