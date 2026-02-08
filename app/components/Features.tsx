import { Shield, Zap, Trash2 } from 'lucide-react';

export default function Features() {
    return (
        <section style={{ marginTop: '6rem', marginBottom: '4rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }} className="text-gradient">Why TempMailo?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <FeatureCard
                    Icon={Shield}
                    title="Anonymity"
                    description="No personal information required. Just open the site and you have a working mailbox ready to receive emails."
                    color="var(--primary)"
                />
                <FeatureCard
                    Icon={Zap}
                    title="Real-time Speed"
                    description="Emails arrive within seconds. Perfect for verification codes, trial signups, and avoiding trackers."
                    color="var(--secondary)"
                />
                <FeatureCard
                    Icon={Trash2}
                    title="Self-Destruct"
                    description="Mailboxes are temporary and will be deleted after some time of inactivity to ensure your privacy."
                    color="var(--accent)"
                />
            </div>
        </section>
    );
}

function FeatureCard({ Icon, title, description, color }: { Icon: any, title: string, description: string, color: string }) {
    return (
        <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{
                width: '50px',
                height: '50px',
                background: `rgba(${color === 'var(--primary)' ? '99, 102, 241' : color === 'var(--secondary)' ? '168, 85, 247' : '236, 72, 153'}, 0.1)`,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: `0 8px 16px rgba(0,0,0,0.2)`
            }}>
                <Icon size={24} color={color} />
            </div>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{description}</p>
        </div>
    );
}
