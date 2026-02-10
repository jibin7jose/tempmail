'use client';

import { Mail, Sun, Moon, Sparkles, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="animate-slide-down" style={{ padding: '2rem 0', marginBottom: '4rem' }}>
            <nav className="header-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                        padding: '0.6rem',
                        borderRadius: '16px',
                        boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)',
                        display: 'flex'
                    }}>
                        <Mail size={24} color="white" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.03em' }}>TempMailo</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Secure Identity</span>
                            <Sparkles size={10} color="var(--primary)" />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div className="badge-desktop-only">
                        <ShieldCheck size={16} />
                        <span>End-to-End Private</span>
                    </div>

                    <button onClick={toggleTheme} style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '14px',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--fg)',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </nav>

            <div className="header-top-spacer" style={{ textAlign: 'center', marginTop: '6rem' }}>
                <h1 className="header-title-responsive" style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-0.05em', lineHeight: '1.1', marginBottom: '1.5rem' }}>
                    Your Inbox, Without the <span style={{ color: 'var(--primary)' }}>Noise.</span>
                </h1>
                <p className="header-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontWeight: '500' }}>
                    Instantly generate disposable email addresses to keep your real inbox private and clean.
                </p>
            </div>
        </header>
    );
}
