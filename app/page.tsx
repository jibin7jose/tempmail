'use client';

import { useMailbox } from './hooks/useMailbox';
import { useState } from 'react';
import { mailApi, MessageDetail } from './lib/mailApi';
import Header from './components/Header';
import EmailGenerator from './components/EmailGenerator';
import InboxSection from './components/InboxSection';
import Features from './components/Features';
import { Mail, Github } from 'lucide-react';

export default function Home() {
  const { account, messages, isLoading, error, createNewAccount, refreshMessages, token } = useMailbox();
  const [selectedMessage, setSelectedMessage] = useState<MessageDetail | null>(null);

  const handleMessageClick = async (id: string) => {
    if (!token) return;
    try {
      const detail = await mailApi.getMessage(id, token);
      setSelectedMessage(detail);
    } catch (err) {
      console.error('Failed to load message:', err);
    }
  };

  return (
    <>
      <div className="mesh-bg"></div>
      <main className="container" style={{ paddingBottom: '6rem' }}>
        <Header />

        {error && (
          <div className="animate-slide-down" style={{
            background: '#FEE2E2',
            border: '2px solid #FCA5A5',
            color: '#B91C1C',
            padding: '1rem 1.5rem',
            borderRadius: '16px',
            marginBottom: '3rem',
            fontSize: '0.95rem',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <EmailGenerator
          address={account?.address || ''}
          isLoading={isLoading}
          onRefresh={createNewAccount}
        />

        <InboxSection
          messages={messages}
          selectedId={selectedMessage?.id}
          onMessageSelect={handleMessageClick}
          onRefresh={refreshMessages}
          selectedMessage={selectedMessage}
          onCloseMessage={() => setSelectedMessage(null)}
        />

        <Features />

        <footer className="footer-responsive" style={{
          marginTop: '8rem',
          padding: '4rem 0',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{ background: 'var(--primary)', padding: '0.4rem', borderRadius: '10px' }}>
              <Mail size={20} color="white" />
            </div>
            <span style={{ fontWeight: '800', fontSize: '1.25rem' }}>TempMailo</span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500', textAlign: 'center', maxWidth: '500px' }}>
            A premium temporary email solution for modern developers and privacy advocates.
          </p>

          <div className="footer-links" style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'var(--text-muted)', fontWeight: '600' }}>GitHub</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Documentation</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Privacy</a>
          </div>

          <div style={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            <p>&copy; {new Date().getFullYear()} TempMailo Engineering</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Designed & Built by Jibin Jose</p>
          </div>
        </footer>
      </main>
    </>
  );
}
