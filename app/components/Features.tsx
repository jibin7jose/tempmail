import { Shield, Zap, RefreshCw, Cpu, Lock, Terminal, Box, Smartphone, Globe } from 'lucide-react';

export default function Features() {
    return (
        <section className="animate-slide-up features-section" style={{ margin: '8rem 0' }}>
            <div className="feature-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h2 className="feature-title-main" style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.04em', marginBottom: '1rem' }}>Designed for the <span style={{ color: 'var(--primary)' }}>Modern Web</span></h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>Every feature built with security and speed at its core.</p>
            </div>

            <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <FeatureItem
                    Icon={Lock}
                    title="Cryptographic Privacy"
                    desc="All mailbox sessions are isolated and encrypted. No tracking, no logs, just absolute privacy."
                    color="#6366F1"
                />
                <FeatureItem
                    Icon={Smartphone}
                    title="Responsive by Design"
                    desc="Whether you're on a high-res monitor or a mobile screen, TempMailo fits perfectly into your workflow."
                    color="#A855F7"
                />
                <FeatureItem
                    Icon={Globe}
                    title="Global Edge Nodes"
                    desc="Powered by a worldwide infrastructure to ensure your temporary emails arrive in milliseconds."
                    color="#F43F5E"
                />
            </div>
        </section>
    );
}

function FeatureItem({ Icon, title, desc, color }: any) {
    return (
        <div className="figma-card feature-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '18px',
                background: `${color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
                border: `1px solid ${color}30`
            }}>
                <Icon size={30} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{title}</h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6', fontWeight: '500' }}>{desc}</p>
        </div>
    );
}
