'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            <Moon size={14} className="icon" color={theme === 'dark' ? 'white' : 'var(--text-muted)'} />
            <div className="ball"></div>
            <Sun size={14} className="icon" color={theme === 'light' ? 'white' : 'var(--text-muted)'} />
        </div>
    );
}
