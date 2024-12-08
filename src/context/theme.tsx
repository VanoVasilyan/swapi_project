import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeContextType, ThemeProviderProps } from '../types/global';
import { themes } from '../data/theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    const theme = isDark ? themes.dark : themes.light;
    const toggleTheme = () => {
        localStorage.setItem('isDark', JSON.stringify(!isDark));
        setIsDark((prevTheme) => (!prevTheme));
    };

    useEffect(() => {
        const isDark = localStorage.getItem('isDark') === 'true';
        setIsDark(isDark)
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useGlobalThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useGlobalThemeContext must be used within a ThemeProvider');
    }

    return context;
};

export { ThemeProvider, useGlobalThemeContext };
