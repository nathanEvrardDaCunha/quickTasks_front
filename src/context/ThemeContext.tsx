import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        // Set initial theme
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;
        const savedTheme = localStorage.getItem('theme');
        const initialTheme = savedTheme ? savedTheme === 'dark' : prefersDark;
        setIsDarkMode(initialTheme);

        // Apply theme immediately
        document.documentElement.dataset.theme = initialTheme
            ? 'dark'
            : 'light';
    }, []);

    useEffect(() => {
        // Update theme when isDarkMode changes
        document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
