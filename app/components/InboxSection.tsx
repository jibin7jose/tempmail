'use client';

import { Clock, RefreshCw, Mail, Trash2 } from 'lucide-react';
import { Message, MessageDetail } from '../lib/mailApi';

interface InboxSectionProps {
    messages: Message[];
    selectedId: string | undefined;
    onMessageSelect: (id: string) => void;
    onRefresh: () => void;
    selectedMessage: MessageDetail | null;
    onCloseMessage: () => void;
}

export default function InboxSection({
    messages,
    selectedId,
    onMessageSelect,
    onRefresh,
    selectedMessage,
    onCloseMessage
}: InboxSectionProps) {
    return (
        <section className="inbox-grid" style={{ gridTemplateColumns: selectedMessage ? '1fr 1.5fr' : '1fr', gap: '2rem', minHeight: '400px' }}>
            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={20} /> Inbox
                    </h2>
                    <button onClick={onRefresh} style={{ color: 'var(--text-muted)' }} title="Refresh Inbox">
                        <RefreshCw size={16} />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', maxHeight: '600px' }}>
                    {messages.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                            <div style={{ marginBottom: '1rem', opacity: 0.3 }}>
                                <Mail size={48} style={{ margin: '0 auto' }} />
                            </div>
                            <p>Waiting for incoming emails...</p>
                            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Refresh manually or wait for auto-update</p>
                        </div>
                    ) : (
                        messages.map(msg => (
                            <div
                                key={msg.id}
                                onClick={() => onMessageSelect(msg.id)}
                                style={{
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    background: selectedId === msg.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                                    border: '1px solid',
                                    borderColor: selectedId === msg.id ? 'var(--primary)' : 'transparent',
                                    cursor: 'pointer',
                                    marginBottom: '0.5rem',
                                    transition: 'all 0.2s ease'
                                }}
                                className="msg-item"
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{msg.from.name || msg.from.address}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>{msg.subject}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {msg.intro}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {selectedMessage && (
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.4s ease' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{selectedMessage.subject}</h3>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    From: <span style={{ color: 'var(--foreground)' }}>{selectedMessage.from.name}</span> &lt;{selectedMessage.from.address}&gt;
                                </div>
                            </div>
                            <button
                                onClick={onCloseMessage}
                                style={{ color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                    <div style={{ flex: 1, padding: '1rem', background: 'var(--surface)', overflowY: 'auto', minHeight: '400px' }}>
                        {selectedMessage.html && selectedMessage.html.length > 0 ? (
                            <iframe
                                srcDoc={`<body style="margin:0; padding:15px; font-family:sans-serif; background:white; color:#333;">${selectedMessage.html[0]}</body>`}
                                title="Email Content"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                    borderRadius: '8px',
                                    minHeight: '600px',
                                    background: 'white'
                                }}
                            />
                        ) : (
                            <pre style={{
                                whiteSpace: 'pre-wrap',
                                fontFamily: 'monospace',
                                fontSize: '0.9rem',
                                color: 'var(--foreground)',
                                padding: '1.5rem',
                                background: 'var(--glass-bg)',
                                borderRadius: '12px',
                                border: '1px solid var(--glass-border)'
                            }}>
                                {selectedMessage.text}
                            </pre>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
