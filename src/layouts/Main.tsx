import './main.scss';

interface MainProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    variant: 'default' | 'fluid';
}

export default function Main({ children, style, variant }: MainProps) {
    const className = `container__main--${variant}`;

    return (
        <main className={className} style={style}>
            {children}
        </main>
    );
}
