import { Mail } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    return (
        <header style={{ marginBottom: '4rem', animation: 'fadeIn 0.8s ease' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '0.5rem', borderRadius: '10px', boxShadow: '0 4px 15px var(--primary-glow)' }}>
                        <Mail size={24} color="white" />
                    </div>
                    <span style={{ fontWeight: '700', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>TempMailo</span>
                </div>
                <ThemeToggle />
            </nav>

            <div style={{ textAlign: 'center' }}>
                <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: '800', letterSpacing: '-0.04em', marginBottom: '1rem' }}>
                    TempMailo
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    Instantly generate disposable email addresses. Keep your real inbox clean and secure from spam, trackers, and advertisers.
                </p>
            </div>
        </header>
    );
}
