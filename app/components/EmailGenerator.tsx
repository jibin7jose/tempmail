'use client';

import { Copy, RefreshCw, Check, Shield, Zap, Globe, ArrowRight } from 'lucide-react';
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
        <div className="figma-card animate-slide-up" style={{ padding: '3rem', marginBottom: '6rem', background: 'linear-gradient(135deg, var(--surface) 0%, var(--primary-soft) 100%)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2rem' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.6rem 1.2rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: '700', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                    <Zap size={16} fill="var(--primary)" />
                    <span>INSTANT GENERATION READY</span>
                </div>

                <div style={{ width: '100%', maxWidth: '700px' }}>
                    <div style={{
                        background: 'var(--surface)',
                        border: '2px solid var(--border)',
                        borderRadius: '24px',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <div style={{
                            background: 'var(--primary-soft)',
                            color: 'var(--primary)',
                            padding: '0.8rem 1.2rem',
                            borderRadius: '16px',
                            fontFamily: 'monospace',
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            flex: 1,
                            textAlign: 'center',
                            letterSpacing: '0.05em'
                        }}>
                            {isLoading ? '...' : address}
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={onRefresh} style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '16px',
                                background: 'var(--bg)',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-muted)'
                            }}>
                                <RefreshCw size={24} className={isLoading ? 'animate-spin' : ''} />
                            </button>

                            <button
                                onClick={copyToClipboard}
                                className="btn-figma btn-figma-primary"
                                style={{ height: '56px', padding: '0 2rem' }}
                            >
                                {copying ? <Check size={20} /> : <Copy size={20} />}
                                <span>{copying ? 'Copied' : 'Copy Address'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '3rem', marginTop: '1rem' }}>
                    <Badge Icon={Shield} text="Privacy Protected" />
                    <Badge Icon={Globe} text="Use Everywhere" />
                    <Badge Icon={ArrowRight} text="No Password Needed" />
                </div>
            </div>
        </div>
    );
}

function Badge({ Icon, text }: { Icon: any, text: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>
            <Icon size={18} color="var(--primary)" />
            <span>{text}</span>
        </div>
    );
}
