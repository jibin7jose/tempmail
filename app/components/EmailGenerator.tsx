'use client';

import { Copy, RefreshCw, Check, Shield, Zap, Globe } from 'lucide-react';
import { useState } from 'react';

interface EmailGeneratorProps {
    address: string;
    isLoading: boolean;
    onRefresh: () => void;
}

export default function EmailGenerator({ address, isLoading, onRefresh }: EmailGeneratorProps) {
    const [copying, setCopying] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(address);
        setCopying(true);
        setTimeout(() => setCopying(false), 2000);
    };

    return (
        <section className="glass-card" style={{ maxWidth: '800px', margin: '0 auto 4rem', textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Your Temporary Address
                </span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    <div style={{
                        background: 'var(--background)',
                        color: 'var(--foreground)',
                        padding: '1rem 1.5rem',
                        borderRadius: '16px',
                        fontSize: '1.25rem',
                        fontWeight: '500',
                        border: '1px solid var(--glass-border)',
                        flex: '1',
                        minWidth: '280px',
                        maxWidth: '500px',
                        fontFamily: 'monospace',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                        {isLoading ? <div className="animate-pulse">Generating address...</div> : address}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={copyToClipboard}
                            className="btn-primary"
                            style={{ padding: '1rem' }}
                            title="Copy to clipboard"
                        >
                            {copying ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                        <button
                            onClick={onRefresh}
                            className="btn-primary"
                            style={{ padding: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                            title="New Address"
                        >
                            <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '3rem' }}>
                <FeatureSmall Icon={Shield} text="Privacy Protected" color="var(--primary)" />
                <FeatureSmall Icon={Zap} text="Instant Setup" color="var(--secondary)" />
                <FeatureSmall Icon={Globe} text="Global Access" color="var(--accent)" />
            </div>
        </section>
    );
}

function FeatureSmall({ Icon, text, color }: { Icon: any, text: string, color: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Icon size={24} color={color} />
            <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{text}</span>
        </div>
    );
}
