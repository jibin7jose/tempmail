'use client';

import { Mail, Clock, Trash2, User, ChevronRight, Inbox, RefreshCw } from 'lucide-react';
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
        <div className="figma-card animate-slide-up inbox-card-responsive" style={{ padding: '0', overflow: 'hidden', display: 'flex', minHeight: '650px' }}>
            {/* Sidebar */}
            <div className="inbox-sidebar-responsive" style={{ width: '380px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{ width: '10px', height: '10px', background: '#22C55E', borderRadius: '50%', boxShadow: '0 0 10px #22C55E' }}></div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Live Inbox</h3>
                    </div>
                    <button onClick={onRefresh} style={{ color: 'var(--text-muted)' }}>
                        <RefreshCw size={18} />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                    {messages.length === 0 ? (
                        <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <Inbox size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.2 }} />
                            <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>No messages yet</p>
                            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Emails sent to your address will appear here instantly.</p>
                        </div>
                    ) : (
                        messages.map(msg => (
                            <div
                                key={msg.id}
                                onClick={() => onMessageSelect(msg.id)}
                                style={{
                                    padding: '1.25rem',
                                    borderRadius: '16px',
                                    background: selectedId === msg.id ? 'var(--primary-soft)' : 'transparent',
                                    cursor: 'pointer',
                                    marginBottom: '0.5rem',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: '1px solid',
                                    borderColor: selectedId === msg.id ? 'var(--primary)' : 'transparent'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: '700', fontSize: '0.95rem', color: selectedId === msg.id ? 'var(--primary)' : 'var(--fg)' }}>
                                        {msg.from.name || (msg.from.address.split('@')[0])}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {msg.subject}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.intro}</p>
                                    <ChevronRight size={14} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="inbox-content-responsive" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {selectedMessage ? (
                    <>
                        <div style={{ padding: '2.5rem', borderBottom: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', lineHeight: '1.2', maxWidth: '80%' }}>{selectedMessage.subject}</h1>
                                <button onClick={onCloseMessage} style={{ background: '#FEE2E2', color: '#EF4444', padding: '0.6rem', borderRadius: '12px' }}>
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: 'var(--primary-soft)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--primary)',
                                    fontWeight: '800',
                                    fontSize: '1.2rem'
                                }}>
                                    {(selectedMessage.from.name || selectedMessage.from.address)[0].toUpperCase()}
                                </div>
                                <div>
                                    <p style={{ fontWeight: '700', fontSize: '1rem' }}>{selectedMessage.from.name || selectedMessage.from.address}</p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedMessage.from.address}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
                            {selectedMessage.html && selectedMessage.html.length > 0 ? (
                                <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '2rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
                                    <iframe
                                        srcDoc={`
                      <style>
                        body { font-family: 'Plus Jakarta Sans', sans-serif; line-height: 1.6; color: #1A1D23; }
                        img { max-width: 100%; height: auto; border-radius: 8px; }
                      </style>
                      ${selectedMessage.html[0]}
                    `}
                                        style={{ width: '100%', height: '500px', border: 'none' }}
                                    />
                                </div>
                            ) : (
                                <div style={{ background: 'var(--primary-soft)', borderRadius: '20px', padding: '2rem', color: 'var(--fg)', fontSize: '1rem', lineHeight: '1.7', fontWeight: '500' }}>
                                    {selectedMessage.text}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="inbox-empty-state" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', textAlign: 'center' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '24px',
                            background: 'var(--primary-soft)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '2rem',
                            color: 'var(--primary)'
                        }}>
                            <Mail size={40} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Open an email</h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '350px', fontSize: '1rem', fontWeight: '500' }}>
                            Choose a message from the sidebar to view its contents and attachments securely.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
