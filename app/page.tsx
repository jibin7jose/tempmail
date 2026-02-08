'use client';

import { useMailbox } from './hooks/useMailbox';
import { Mail, RefreshCw, Copy, Trash2, Shield, Zap, Globe, Clock, Check, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { mailApi, MessageDetail } from './lib/mailApi';

export default function Home() {
  const { account, messages, isLoading, error, createNewAccount, refreshMessages, token } = useMailbox();
  const [copying, setCopying] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageDetail | null>(null);
  const [loadingMsg, setLoadingMsg] = useState(false);

  const copyToClipboard = () => {
    if (!account) return;
    navigator.clipboard.writeText(account.address);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const handleMessageClick = async (id: string) => {
    if (!token) return;
    setLoadingMsg(true);
    try {
      const detail = await mailApi.getMessage(id, token);
      setSelectedMessage(detail);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMsg(false);
    }
  };

  return (
    <main className="premium-container">
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeIn 0.8s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '0.5rem', borderRadius: '12px' }}>
            <Mail size={32} color="white" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>TempMailo</h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Instantly generate disposable email addresses. Keep your real inbox clean and secure from spam, trackers, and advertisers.
        </p>
      </header>

      {/* Main Action Area */}
      <section className="glass-card" style={{ maxWidth: '800px', margin: '0 auto 4rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Your Temporary Address
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '1rem 1.5rem',
              borderRadius: '16px',
              fontSize: '1.25rem',
              fontWeight: '500',
              border: '1px solid var(--glass-border)',
              flex: 1,
              maxWidth: '500px',
              fontFamily: 'monospace'
            }}>
              {isLoading ? 'Generating address...' : account?.address || 'Error loading address'}
            </div>
            <button
              onClick={copyToClipboard}
              className="btn-primary"
              style={{ padding: '1rem' }}
              title="Copy to clipboard"
            >
              {copying ? <Check size={20} /> : <Copy size={20} />}
            </button>
            <button
              onClick={createNewAccount}
              className="btn-primary"
              style={{ padding: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
              title="New Address"
            >
              <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={24} color="var(--primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Privacy Protected</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={24} color="var(--secondary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Instant Setup</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={24} color="var(--accent)" />
            <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Global Access</span>
          </div>
        </div>
      </section>

      {/* Inbox Section */}
      <section style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1fr 1.5fr' : '1fr', gap: '2rem', minHeight: '400px' }}>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} /> Inbox
            </h2>
            <button onClick={refreshMessages} style={{ color: 'var(--text-muted)' }}>
              <RefreshCw size={16} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                <div style={{ marginBottom: '1rem', opacity: 0.5 }}>
                  <Mail size={48} style={{ margin: '0 auto' }} />
                </div>
                <p>Waiting for incoming emails...</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>It refreshes automatically every 10s</p>
              </div>
            ) : (
              messages.map(msg => (
                <div
                  key={msg.id}
                  onClick={() => handleMessageClick(msg.id)}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    background: selectedMessage?.id === msg.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: '1px solid transparent',
                    borderColor: selectedMessage?.id === msg.id ? 'var(--primary)' : 'transparent',
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

        {/* Message Details */}
        {selectedMessage && (
          <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{selectedMessage.subject}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    From: <span style={{ color: 'var(--foreground)' }}>{selectedMessage.from.name}</span> &lt;{selectedMessage.from.address}&gt;
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div style={{ flex: 1, padding: '1.5rem', background: 'rgba(255,255,255,0.02)', overflowY: 'auto' }}>
              {selectedMessage.html && selectedMessage.html.length > 0 ? (
                <iframe
                  srcDoc={selectedMessage.html[0]}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    background: 'white',
                    borderRadius: '8px',
                    minHeight: '400px'
                  }}
                />
              ) : (
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.9rem' }}>
                  {selectedMessage.text}
                </pre>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section style={{ marginTop: '6rem', marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }} className="text-gradient">Why TempMailo?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Shield size={20} color="var(--primary)" />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Anonymity</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No personal information required. Just open the site and you have a working mailbox.</p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Zap size={20} color="var(--secondary)" />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Real-time</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Emails arrive within seconds. Perfect for verification codes and trial signups.</p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Trash2 size={20} color="var(--accent)" />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Self-Destruct</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mailboxes are temporary and will be deleted after some time of inactivity.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} TempMailo. Built with Next.js & Premium Aesthetics.</p>
        <p style={{ marginTop: '0.5rem' }}>Protecting over 1M+ inboxes from spam.</p>
      </footer>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .msg-item:hover {
          background: rgba(255,255,255,0.05) !important;
        }
      `}</style>
    </main>
  );
}
