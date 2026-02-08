'use client';

import { useState, useEffect, useCallback } from 'react';
import { mailApi, Message, Account } from '../lib/mailApi';

export function useMailbox() {
    const [account, setAccount] = useState<Account | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const createNewAccount = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const domains = await mailApi.getDomains();
            const domain = domains[0]?.domain;
            if (!domain) throw new Error('No domains available');

            const username = Math.random().toString(36).substring(2, 10);
            const password = Math.random().toString(36).substring(2, 15);
            const address = `${username}@${domain}`;

            const newAccount = await mailApi.createAccount(address, password);
            const newToken = await mailApi.getToken(address, password);

            setAccount(newAccount);
            setToken(newToken);

            const session = { address, password, token: newToken, account: newAccount };
            localStorage.setItem('tempmail_session', JSON.stringify(session));

            setMessages([]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refreshMessages = useCallback(async () => {
        if (!token) return;
        try {
            const msgs = await mailApi.getMessages(token);
            setMessages(msgs);
        } catch (err) {
            console.error('Failed to refresh messages:', err);
        }
    }, [token]);

    useEffect(() => {
        const saved = localStorage.getItem('tempmail_session');
        if (saved) {
            const { account, token } = JSON.parse(saved);
            setAccount(account);
            setToken(token);
            setIsLoading(false);
        } else {
            createNewAccount();
        }
    }, [createNewAccount]);

    useEffect(() => {
        if (token) {
            refreshMessages();
            const interval = setInterval(refreshMessages, 10000);
            return () => clearInterval(interval);
        }
    }, [token, refreshMessages]);

    return {
        account,
        token,
        messages,
        isLoading,
        error,
        createNewAccount,
        refreshMessages
    };
}
