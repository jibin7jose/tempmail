'use client';

import { useMailbox } from './hooks/useMailbox';
import { useState } from 'react';
import { mailApi, MessageDetail } from './lib/mailApi';
import Header from './components/Header';
import EmailGenerator from './components/EmailGenerator';
import InboxSection from './components/InboxSection';
import Features from './components/Features';

export default function Home() {
  const { account, messages, isLoading, error, createNewAccount, refreshMessages, token } = useMailbox();
  const [selectedMessage, setSelectedMessage] = useState<MessageDetail | null>(null);
  const [loadingMsg, setLoadingMsg] = useState(false);

  const handleMessageClick = async (id: string) => {
    if (!token) return;
    setLoadingMsg(true);
    try {
      const detail = await mailApi.getMessage(id, token);
      setSelectedMessage(detail);
    } catch (err) {
      console.error('Failed to load message:', err);
    } finally {
      setLoadingMsg(false);
    }
  };

  return (
    <main className="premium-container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <Header />

      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#ef4444',
          padding: '1rem',
          borderRadius: '12px',
          marginBottom: '2rem',
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

      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4rem' }}>
        <p>&copy; {new Date().getFullYear()} TempMailo. Designed with ✨ for modern developers.</p>
        <p style={{ marginTop: '0.5rem', opacity: 0.6 }}>Using Mail.tm Infrastructure</p>
      </footer>
    </main>
  );
}
