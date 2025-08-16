import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('dark');

    // Apply dark class to document root
    useEffect(() => {
        const root = document.documentElement;
        if (currentTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [currentTheme]);

    const themes = {
        light: {
            bg: {
                primary: 'bg-background',
                secondary: 'bg-card',
                tertiary: 'bg-muted'
            },
            text: {
                primary: 'text-foreground',
                secondary: 'text-muted-foreground',
                tertiary: 'text-muted-foreground'
            },
            border: {
                primary: 'border-border',
                secondary: 'border-border'
            }
        },
        dark: {
            bg: {
                primary: 'bg-background',
                secondary: 'bg-card',
                tertiary: 'bg-muted'
            },
            text: {
                primary: 'text-foreground',
                secondary: 'text-muted-foreground',
                tertiary: 'text-muted-foreground'
            },
            border: {
                primary: 'border-border',
                secondary: 'border-border'
            }
        }
    };

    const theme = themes[currentTheme];

    const toggleTheme = () => {
        setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const value = {
        theme,
        currentTheme,
        isDarkMode: currentTheme === 'dark',
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
